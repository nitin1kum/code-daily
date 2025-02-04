import { ConvexError, v } from "convex/values";
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
            await ctx.db.insert("users",{
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

export const createSubscription = mutation({
    args : {
        order_id : v.string(),
        payment_id : v.string(),
    },
    handler: async(ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new ConvexError("User not authorized");

        const user = await ctx.db.query("users")
        .withIndex("by_user_id")
        .filter(q => q.eq(q.field("userId"),identity.subject))
        .first();

        if(!user) throw new ConvexError("User not found");

        await ctx.db.patch(user._id,{
            isPro : true,
            razorPayOrderId : args.order_id,
            paymentId : args.payment_id
        })
    }
})