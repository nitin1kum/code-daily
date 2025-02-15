import { useCodeEditorState } from "@/store/CodeEditorState";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { BiX } from "react-icons/bi";
import toast from "react-hot-toast";
import { useModeSlector } from "@/store/ModeSelector";
import { useDevelopmentState } from "@/store/DevelopmentState";

const ShareSnipperDialog = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const {mode} = useModeSlector();
  const {html,css,script} = useDevelopmentState();
  const [isPrivate,setIsPrivate] = useState<boolean>(false);
  const { language,code } = useCodeEditorState();
  const createSnippet = useMutation(api.snippet.createSnippet);
  const createPen = useMutation(api.codepens.createPen);

  const handleShare = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);

    try {
      if(mode === "Code"){
        await createSnippet({title,language,code,isPrivate})
      }
      else{
        await createPen({title,html,css,script,isPrivate})
      }
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully");
    } catch (error) {
      console.log("Error while sharing snippet : ",error);
      toast.error("Error while sharing snippet");
    }finally{
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-[#1e1e2e] rounded-lg p-3 sm:p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Share Snippet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <BiX className="size-5" />
          </button>
        </div>

        <form onSubmit={handleShare}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter snippet title"
              required
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <input type="checkbox" id="private" name="private" onChange={() => setIsPrivate(!isPrivate)} checked={isPrivate}/>
            <label
              htmlFor="private"
              className="block font-medium text-gray-400"
            >
              Private
            </label>
          </div>
          <div className="flex w-full justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500/10 text-white rounded-lg hover:bg-gray-600/10 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareSnipperDialog;
