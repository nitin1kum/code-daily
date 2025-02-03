import { useState } from "react";
import { BiCode, BiSend } from "react-icons/bi";
import CommentContent from "./CommentContent";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmiting: boolean;
}
function CommentForm({ onSubmit, isSubmiting }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleKeyDown = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Tab"){
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComment = comment.substring(0,start) + "  " + comment.substring(end);
      setComment(newComment);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = 1;
    }
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    if(!comment.trim()) return;

    await onSubmit(comment);

    setComment("");
    setIsPreview(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-[#0a0a0f] rounded-xl border border-[#ffffff0a] overflow-hidden">
        {/* Comment form header */}
        <div className="flex justify-end items-center px-4 pt-2">
            <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`text-sm px-3  py-1 rounded-md transition-colors ${isPreview ? "bg-blue-500/10 text-blue-400" : "hover:bg-[#ffffff08] text-gray-400"}`}
            >
            {isPreview ? "Edit" : "Preview"}
            </button>
        </div>

        {/* Comment form body */}
        {isPreview ? (
          <div className="min-h-[120px] p-4 text-[#e1e1e3]">
            <CommentContent content={comment}/>
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Type here...\n```javascript\nconsole.log('hello world');\n```"}
            className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none resize-none min-h-[120px] p-4 font-mono text-sm"
          />
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-4 px-4 py-3 bg-[#080809] border-t border-[#ffffff0a]"
        >
          <div>
            <div className="hidden sm:block  text-xs text-[#808086] space-y-1">
              <BiCode className="size-4 inline-block" />
              <span className="pl-1">Formet code with ```language</span>
            </div>
            <div className="text-[#808086]/60 pl-5 text-sm">
              Tab key inserts spaces. Preview your comment before posting
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmiting || !comment.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
          >
            {isSubmiting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Posting</span>
              </>
            ) : (
              <>
                <BiSend className="size-4" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
