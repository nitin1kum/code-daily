import React from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import toast from 'react-hot-toast';
import { FaRegStar, FaStar } from 'react-icons/fa';

const StarPen = ({penId} : {penId : Id<"codepens">}) => {
    const {isSignedIn} = useAuth();

    const isStarred = isSignedIn && useQuery(api.codepens.isPenStarred,{penId});
    const starCount = useQuery(api.codepens.getPenStarCount,{penId});
    const star = useMutation(api.codepens.starPen);

    const handleStar = async() => {
        if(!isSignedIn){
            toast.error("Login to star the snippet.");
            return;
        }
        await star({penId});
    }

  return (
    <button className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${isStarred ? "bg-yellow-500/10 hover:bg-yellow-500/20" : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"}`} onClick={handleStar}>
        {isStarred ? (
            <FaStar className='size-4 fill-yellow-500'/>
        ) : (
            <FaRegStar className='size-4 text-gray-500 hover:text-yellow-500' />
        )}
        <span className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}>{starCount}</span>
    </button>
  )
}

export default StarPen