import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), //clerk ID
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    proSince: v.optional(v.number()),
    razorPayOrderId: v.optional(v.string()),
    paymentId: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  codeExecution: defineTable({
    userId: v.string(), //clerk ID
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.string(), //clerk ID
    title: v.string(),
    language: v.string(),
    isPrivate : v.boolean(),
    code: v.string(),
    userName: v.string(), // store user's name for easy access
  }).index("by_user_id", ["userId"]),

  snippetsComments: defineTable({
    snippetId: v.id("snippets"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(), // This will store HTML content
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
  })
    .index("by_user_id", ["userId"])
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_and_snippet_id", ["userId", "snippetId"]),

  codepens: defineTable({
    userId: v.string(),
    html: v.string(),
    css: v.string(),
    script: v.string(),
    isPrivate : v.boolean(),
    title: v.string(),
    userName : v.string(),
  }).index("by_user_id", ["userId"]),

  penStars: defineTable({
    userId: v.string(),
    penId: v.id("codepens"),
  })
    .index("by_user_id", ["userId"])
    .index("by_pen_id", ["penId"])
    .index("by_user_and_pen_id", ["userId", "penId"]),

    penComments : defineTable({
      penId: v.id("codepens"),
      userId: v.string(),
      userName: v.string(),
      content: v.string(),
    }).index("by_pen_id", ["penId"]),
});
