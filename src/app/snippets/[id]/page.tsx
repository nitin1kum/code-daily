"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkelton from "./_components/SnippetLoadingSkelton";
import NavigationHeader from "@/components/NavigationHeader";
import Image from "next/image";
import { BiMessage, BiUser } from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";
import Comments from "./_components/Comments";
import CodeBlock from "../_components/CodeBlock";

const page = () => {
  const snippetId = useParams().id;
  const snippet = useQuery(api.snippet.getSnippet, {
    snippetId: snippetId as Id<"snippets">,
  });
  const comments = useQuery(api.snippet.getComment, {
    snippetId: snippetId as Id<"snippets">,
  });

  if (snippet === undefined) return <SnippetLoadingSkelton />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 p-6 sm:py-8 lg:py-12">
        {/* header */}

        <div className=" max-w-[90rem] mx-auto">
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop:blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center  gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff0a] p-2.5">
                  <Image
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {snippet.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <BiUser className="size-4" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <CiClock1 className="size-4" />
                      <span>
                        {new Date(snippet._creationTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <BiMessage className="size-4" />
                      <span>{comments?.length} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff0a] text-[#808086] rounded-lg text-sm font-medium">
                {snippet.language}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
            <CodeBlock language={snippet.language} code={snippet.code} />
          </div>
          <Comments snippetId={snippet._id} />
        </div>
      </main>
    </div>
  );
};

export default page;
