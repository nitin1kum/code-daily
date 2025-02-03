import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const createPen = mutation({
  args: {
    title: v.string(),
    html: v.string(),
    css: v.string(),
    script: v.string(),
    isPrivate : v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not Authenticated");

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) throw new ConvexError("User not found.");

    const penId = await ctx.db.insert("codepens", {
      ...args,
      userId: user.userId,
      userName: user.name,
    });

    return penId;
  },
});

export const getPens = query({
  handler: async (ctx) => {
    const pens = await ctx.db.query("codepens")
    .filter(q => q.eq(q.field("isPrivate"),false))
    .order("desc").collect();
    return pens;
  },
});

export const isPenStarred = query({
  args: {
    penId: v.id("codepens"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("User not found");

    const getStar = await ctx.db
      .query("penStars")
      .withIndex("by_user_and_pen_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity?.subject) &&
          q.eq(q.field("penId"), args.penId)
      )
      .first();

    return getStar !== null;
  },
});

export const getPen = query({
  args: {
    penId: v.id("codepens"),
  },
  handler: async (ctx, args) => {
    const pen = await ctx.db.get(args.penId);
    if (!pen) throw new ConvexError("pen not found");
    return pen;
  },
});

export const getComment = query({
  args: {
    penId: v.id("codepens"),
  },
  handler: async (ctx, args) => {
    const comments = ctx.db
      .query("penComments")
      .withIndex("by_pen_id")
      .filter((q) => q.eq(q.field("penId"), args.penId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const addComment = mutation({
  args: {
    penId: v.id("codepens"),
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

    await ctx.db.insert("penComments", {
      userId: user.userId,
      userName: user.name,
      penId: args.penId,
      content: args.content,
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("penComments"),
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

export const getPenStarCount = query({
  args: {
    penId: v.id("codepens"),
  },
  handler: async (ctx, args) => {
    const cntStars = await ctx.db
      .query("penStars")
      .withIndex("by_pen_id")
      .filter((q) => q.eq(q.field("penId"), args.penId))
      .collect();

    return cntStars.length;
  },
});

export const deletePen = mutation({
  args: {
    penId: v.id("codepens"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not found");

    const pen = await ctx.db.get(args.penId);
    if (!pen) throw new ConvexError("pen not found");

    if (pen.userId !== identity.subject)
      throw new ConvexError("Not authorized to delete this pen");

    const comments = await ctx.db
      .query("penComments")
      .withIndex("by_pen_id")
      .filter((q) => q.eq(q.field("penId"), args.penId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    const stars = await ctx.db
      .query("penStars")
      .withIndex("by_pen_id")
      .filter((q) => q.eq(q.field("penId"), args.penId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.penId);
  },
});

export const starPen = mutation({
  args: {
    penId: v.id("codepens"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not found");

    const existedStar = await ctx.db
      .query("penStars")
      .withIndex("by_user_and_pen_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("penId"), args.penId)
      )
      .first();

    if (existedStar) {
      await ctx.db.delete(existedStar._id);
    } else {
      await ctx.db.insert("penStars", {
        penId: args.penId,
        userId: identity.subject,
      });
    }
  },
});

export const getStarredpens = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new ConvexError("User Not Authorized");

    const stars = await ctx.db
      .query("penStars")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    const pens = await Promise.all(
      stars.map((star) => ctx.db.get(star.penId))
    );

    return pens.filter((q) => q !== null);
  },
});

export const getUserPens = query({
  args : {
    userId : v.string(),
    paginationOpts : paginationOptsValidator
  },
  handler : async(ctx,args) => {
    const pens = await ctx.db.query("codepens")
   .withIndex("by_user_id")
   .filter(q => q.eq(q.field("userId"),args.userId))
   .order("desc")
   .paginate(args.paginationOpts);

   return pens;
  }
})
