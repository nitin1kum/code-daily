"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import NavigationHeader from "@/components/NavigationHeader";
import Image from "next/image";
import {
  BiCode,
  BiMessage,
  BiUser,
} from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import PenLoadingSkelton from "./_components/PenLoadingSkelton";
import CopyButton from "../../_components/CopyButton";
import Comments from "./_components/Comments";
import CodeBlock from "../../_components/CodeBlock";

const page = () => {
  const penId = useParams().id;
  const pen = useQuery(api.codepens.getPen, {
    penId: penId as Id<"codepens">,
  });
  const comments = useQuery(api.codepens.getComment, {
    penId: penId as Id<"codepens">,
  });

  if (pen === undefined) return <PenLoadingSkelton />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* header */}

        <div className=" max-w-[90rem] mx-auto">

        <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop:blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center  gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff0a] p-2.5">
                <Image
                  src={`/html.png`}
                  alt={`html logo`}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  {pen.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center gap-2 text-[#8b8b8d]">
                    <BiUser className="size-4" />
                    <span>{pen.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8b8b8d]">
                    <CiClock1 className="size-4" />
                    <span>
                      {new Date(pen._creationTime).toLocaleDateString()}
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
              HTML
            </div>
          </div>
        </div>

        {/* HTML Editor */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
            <div className="flex items-center gap-2 text-[#808086]">
              <BiCode className="size-4" />
              <span className="text-sm font-medium">HTML</span>
            </div>
            <CopyButton code={pen.html}/>
          </div>
          <CodeBlock language="html" code={pen.html}/>
        </div>

        {/* CSS Editor */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
            <div className="flex items-center gap-2 text-[#808086]">
              <BiCode className="size-4" />
              <span className="text-sm font-medium">CSS</span>
            </div>
            <CopyButton code={pen.css}/>
          </div>
          <CodeBlock language="css" code={pen.css}/>
        </div>

        {/* Script Editor */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
            <div className="flex items-center gap-2 text-[#808086]">
              <BiCode className="size-4" />
              <span className="text-sm font-medium">Javascript</span>
            </div>
            <CopyButton code={pen.script}/>
          </div>
          <CodeBlock language="javascript" code={pen.script}/>
        </div>

        <Comments penId={pen._id} />
        </div>
      </main>
    </div>
  );
};

export default page;
