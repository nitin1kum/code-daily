import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
    args: {
        userId : v.string(),
        name : v.string(),
        email : v.string()
    },
    handler : async (ctx, arg) => {
        const existingUser = await ctx.db.query("users")
        .filter(q => q.eq(q.field("userId"), arg.userId))
        .first();

        if(!existingUser){
            const user = await ctx.db.insert("users",{
                userId : arg.userId,
                name : arg.name,
                email : arg.email,
                isPro : false
            })
        }
    }
})

export const getUser = query({
    args: {userId : v.string()},
    handler : async(ctx,args) => {
        if(!args.userId) return null;

        const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first();

        if(!user) return null;

        return user;
    }
})