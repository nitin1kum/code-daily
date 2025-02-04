import React, { useState } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { SignInButton, useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { BiMessage } from 'react-icons/bi'
import Comment from './Comment'
import CommentForm from '../../_components/CommentForm'

function Comments({snippetId} : {snippetId : Id<"snippets">}) {
    const {user} = useUser();
    const [isSubmiting,setIsSubmiting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const comments = useQuery(api.snippet.getComment,{snippetId});
    const addComment = useMutation(api.snippet.addComment);
    const deleteComment = useMutation(api.snippet.deleteComment);

    const handleSubmit = async( content : string) => {
        if(!user){
            toast.error("Login to add comment");
        }

        setIsSubmiting(true);

        try {
            await addComment({snippetId,content});
            toast.success("Comment added successfully");
        } catch (error:unknown) {
            console.log("Error while adding comment",error);
            toast.error("Something went wrong.")
        }finally{
            setIsSubmiting(false);
        }
    }

    const handleDelete = async(commentId : Id<"snippetsComments">) => {
        setIsDeleting(true);

        try {
            await deleteComment({commentId});
            toast.success("Comment deleted successfully");
        } catch (error:unknown) {
            console.log("Error while deleting comment-",error);
            toast.error("Something went wrong");
        }finally{
            setIsDeleting(false);
        }
    }
     
  return (
    <div className='bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden'>
        <div className="px-6 sm:px-6 py-6 border-b border-[#ffffff0a]">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <BiMessage className='size-5'/>
                Discussion ({comments?.length})
            </h2>
        </div>

        <div className="p-6 sm:p-8">
            {user ? (
               <CommentForm onSubmit={handleSubmit} isSubmiting={isSubmiting}/>
            ):(
                <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
                    <p className="text-[#808086] mb-4">Sign in to join the discussion</p>
                    <SignInButton mode='modal'>
                        <button className='px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors'>
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            )}

            <div className="space-y-6">
                {comments?.map((comment) => (
                    <Comment
                        key= {comment._id}
                        comment={comment}
                        onDelete = {handleDelete}
                        isDeleting = {isDeleting}
                        currentUserId = {user?.id}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Comments