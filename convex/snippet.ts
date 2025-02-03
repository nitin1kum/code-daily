import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
    isPrivate : v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not Authenticated");

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    // console.log(identity.subject,user)

    if (!user) throw new ConvexError("User not found.");

    const snippetId = await ctx.db.insert("snippets", {
      ...args,
      userId: user.userId,
      userName: user.name,
    });

    return snippetId;
  },
});

export const getSnippets = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets")
    .filter(q => q.eq(q.field("isPrivate"),false))
    .order("desc").collect();
    return snippets;
  },
});

export const isSnippetStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("User not found");

    const getStar = await ctx.db
      .query("stars")
      .withIndex("by_user_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity?.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    return getStar !== null;
  },
});

export const getSnippet = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new ConvexError("Snippet not found");
    return snippet;
  },
});

export const getComment = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const comments = ctx.db
      .query("snippetsComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const addComment = mutation({
  args: {
    snippetId: v.id("snippets"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) throw new ConvexError("User not found");

    await ctx.db.insert("snippetsComments", {
      userId: user.userId,
      userName: user.name,
      snippetId: args.snippetId,
      content: args.content,
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("snippetsComments"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authorized");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new ConvexError("Comment not found");

    if (comment.userId !== identity.subject)
      throw new ConvexError("Not authorized to delete this comment");

    await ctx.db.delete(args.commentId);
  },
});

export const getSnippetStarCount = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const cntStars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    return cntStars.length;
  },
});

export const deleteSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not found");

    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new ConvexError("Snippet not found");

    if (snippet.userId !== identity.subject)
      throw new ConvexError("Not authorized to delete this snippet");

    const comments = await ctx.db
      .query("snippetsComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.snippetId);
  },
});

export const starSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not found");

    const existedStar = await ctx.db
      .query("stars")
      .withIndex("by_user_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    if (existedStar) {
      await ctx.db.delete(existedStar._id);
    } else {
      await ctx.db.insert("stars", {
        snippetId: args.snippetId,
        userId: identity.subject,
      });
    }
  },
});

export const getStarredSnippets = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("User Not Authorized");

    const stars = await ctx.db
      .query("stars")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    const snippets = await Promise.all(
      stars.map((star) => ctx.db.get(star.snippetId))
    );

    return snippets.filter((q) => q !== null);
  },
});

export const getUserSnippet = query({
  args : {
    userId : v.string(),
    paginationOpts : paginationOptsValidator
  },
  handler : async(ctx,args) => {
    const snippets = await ctx.db.query("snippets")
   .withIndex("by_user_id")
   .filter(q => q.eq(q.field("userId"),args.userId))
   .order("desc")
   .paginate(args.paginationOpts);

   return snippets;
  }
})
