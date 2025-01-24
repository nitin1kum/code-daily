import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
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
      userId: user._id,
      userName: user.name,
    });

    return snippetId;
  },
});

export const getSnippet = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
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

    const getStar = ctx.db
      .query("stars")
      .withIndex("by_user_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity?.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    if (!getStar) return false;

    return true;
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
          q.eq(q.field("snippetId"), args.snippetId) &&
          q.eq(q.field("userId"), identity.subject)
      )
      .first();

    if (!existedStar) {
      await ctx.db.insert("stars", {
        snippetId: args.snippetId,
        userId: identity.subject,
      });
    } else {
      await ctx.db.delete(existedStar._id);
    }
  },
});
