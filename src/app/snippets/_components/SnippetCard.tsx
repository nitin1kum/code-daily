"use client"

import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

function SnippetCard({snippet} : {snippet : Snippet}){
    const {user} = useUser();
    const deleteSnippet = useMutation(api.snippet.deleteSnippet);
    const[isDelete,setIsDelete] = useState(false);

    const handleDelete = async () =>{

    }
    
    return(
        <div></div>
    )
}

export default SnippetCard;