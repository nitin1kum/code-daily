"use client";

import { Pen } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import Image from "next/image";
import { BiTrash, BiUser } from "react-icons/bi";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuClock } from "react-icons/lu";
import toast from "react-hot-toast";
import DeleteAlert from "./DeleteAlert";
import StarPen from "@/components/StarPen";

function PenCard({ pen }: { pen: Pen }) {
  const { user } = useUser();
  const deletePen = useMutation(api.codepens.deletePen);
  const [isClose, setIsClose] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsClose(true);
    setIsDeleting(true);

    try {
        await deletePen({penId : pen._id});
        toast.success("Snippet deleted successfully");
    } catch (error:unknown) {
        console.log("Error deleting snipppet: ",error);
        toast.error("Error deleting snippet");
    }finally{
        setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/snippets/pen/${pen._id}`} className="h-full block">
        <div className="relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl border border-[#313244] hover:border-[#313244] transition-all duration-300 overflow-hidden">
          <div className="p-3 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:opacity-30 opacity-20 rounded-lg blur transition-all duration-500"
                    area-hidden="true"
                  />
                  <div className="realtive p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:to-purple-500/20 group-hover:from-blue-500/20 transition-all duration-500">
                    <Image
                      src={`/html.png`}
                      alt={`html logo`}
                      width={24}
                      height={24}
                      className="size-6 object-contain relative z-10"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-0.5 bg-blue-400 rounded-lg text-xs font-medium">
                    HTML
                  </span>
                  <div className="flex items-center gap-2 textxs text-gray-500 text-xs">
                    <LuClock className="size-3" />
                    {new Date(pen._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="absolute top-5 right-5 z-10 flex gap-4 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarPen penId={pen._id}/>
                {user?.id === pen.userId && (
                  <div className="z-10">
                    <button
                      onClick={() => setIsClose(false)}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${isDeleting ? "bg-red-500/10 text-red-400 cursor-not-allowed" : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400"}`}
                    >
                      {isDeleting ? (
                        <div className="size-3.5 border-2 border-red-400/30 bordre-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <BiTrash className="size-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Content */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {pen.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-gray-800/50">
                      <BiUser className="size-3" />
                    </div>
                    <span className="truncate max-w-[150px]">
                      {pen.userName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative group/code">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/5
                    rounded-lg opacity-0 group-hover/code:opacity-100 transition-all"
                />
                <pre className="relative bg-black/30 rounded-lg p-4 overflow-hidden text-sm text-gray-300 from-mono line-clamp-3">
                  {pen.html}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
    {!isClose && <DeleteAlert onClose={()=>setIsClose(true)} handleDelete={handleDelete}/>}
    </>
  );
}

export default PenCard;
