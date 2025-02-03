"use client";

import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileHeaderSkelton from "./_components/ProfileHeaderSkelton";
import { LuListVideo } from "react-icons/lu";
import { BiChevronRight, BiCode, BiStar } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TbLoader2 } from "react-icons/tb";
import { BsClock } from "react-icons/bs";
import StarButton from "@/components/StarButton";
import Link from "next/link";
import CodeBlock from "./_components/CodeBlock";
import { MdTextSnippet } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import StarPen from "@/components/StarPen";

const TABS = [
  {
    id: "snippets",
    label: "Snippets",
    icon: MdTextSnippet,
  },
  {
    id: "codepens",
    label: "Code Pens",
    icon: LiaPenSolid,
  },
  {
    id: "starredSnippets",
    label: "Starred Snippets",
    icon: BiStar,
  },
  {
    id: "starredPens",
    label: "Starred Pen",
    icon: BiStar,
  },
  {
    id: "executions",
    label: "Code Executions",
    icon: LuListVideo,
  },
];

function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "executions" | "starredSnippets" | "codepens" | "starredPens" | "snippets"
  >("snippets");

  const userSnippetStats = useQuery(api.codeExecution.getUserSnippetStats, {
    userId: user?.id ?? "",
  });

  const starredSnippets = useQuery(api.snippet.getStarredSnippets);
  const starredPens = useQuery(api.codepens.getStarredpens);

  const {
    results: snippets,
    status: snippetStatus,
    isLoading: isLoadingSnippets,
    loadMore: loadMoreSnippet,
  } = usePaginatedQuery(
    api.snippet.getUserSnippet,
    { userId: user?.id ?? "" },
    { initialNumItems: 5 }
  );

  const {
    results: pens,
    status: penStatus,
    isLoading: isLoadingPens,
    loadMore: loadMorePens,
  } = usePaginatedQuery(
    api.codepens.getUserPens,
    { userId: user?.id ?? "" },
    { initialNumItems: 5 }
  );

  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore: loadMoreExecution,
  } = usePaginatedQuery(
    api.codeExecution.getExecution,
    { userId: user?.id ?? "" },
    { initialNumItems: 5 }
  );

  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

  const handleLoadMoreSnippet = () => {
    if (executionStatus === "CanLoadMore") loadMoreSnippet(5);
  };

  const handleLoadMorePens = () => {
    if (executionStatus === "CanLoadMore") loadMorePens(5);
  };

  const handleLoadMoreExecutions = () => {
    if (executionStatus === "CanLoadMore") loadMoreExecution(5);
  };

  if (!user && isLoaded) return router.push("/");

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Header */}

        {(user === undefined ||
          userSnippetStats === undefined ||
          !isLoaded) && <ProfileHeaderSkelton />}

        {userSnippetStats && userData && (
          <ProfileHeader
            userSnippetStats={userSnippetStats}
            userData={userData}
            user={user}
          />
        )}

        <div className="relative bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl shadow-2xl shadow-black/50 border-gray-800/50 backdrop-blur-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-800/50 overflow-x-scroll">
            <div className="flex space-x-1 p-4 w-max flex-nowrap">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as
                        | "executions"
                        | "starredSnippets"
                        | "codepens"
                        | "starredPens"
                        | "snippets"
                    )
                  }
                  className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
                >
                  {activeTab == tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500/10 rounded-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    ></motion.div>
                  )}
                  <tab.icon className="size-4 relative z-10" />
                  <span className="text-sm font-medium whitespace-nowrap relative z-10">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* Active Tab is Executions: */}
              {activeTab === "executions" && (
                <div className="space-y-6">
                  {executions.map((execution) => (
                    <div
                      className="group rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/50"
                      key={execution._id}
                    >
                      <div className="flex items-center justify-between p-4 bg-black/30 border border-gray-800/50 rounded-t-xl">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image
                              src={"/" + execution.language + ".png"}
                              alt={`${execution.language} code`}
                              className="rounded-lg relative z-10 object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {execution.language.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400">
                                {new Date(
                                  execution._creationTime
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${execution.error ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}
                              >
                                {execution.error ? "Error" : "Success"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-black/20 rounded-b-xl border border-t-0 border-gray-800/50">
                        <CodeBlock
                          code={execution.code}
                          language={execution.language}
                        />

                        {(execution.output || execution.error) && (
                          <div className="mt-4 p-4 rounded-lg bg-black/40">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">
                              Output
                            </h4>
                            <pre
                              className={`text-sm ${execution.error ? "text-red-400" : "text-green-400"}`}
                            >
                              {execution.error || execution.output}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoadingExecutions ? (
                    <div className="text-center py-12">
                      <TbLoader2 className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        Loading code executions...
                      </h3>
                    </div>
                  ) : (
                    executions.length === 0 && (
                      <div className="text-center py-12">
                        <BiCode className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">
                          No code executions yet
                        </h3>
                        <p className="text-gray-500">
                          Start coding to see your execution history!
                        </p>
                      </div>
                    )
                  )}

                  {/* Load More Button */}
                  {executionStatus === "CanLoadMore" && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleLoadMoreExecutions}
                        className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg flex items-center gap-2 
                        transition-colors"
                      >
                        Load More
                        <BiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVE TAB IS SNIPPET: */}
              {activeTab === "snippets" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {snippets?.map((snippet) => (
                      <div key={snippet._id} className="group relative">
                        <Link href={`/snippets/${snippet._id}`}>
                          <div
                            className="bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 
                          transition-all duration-300 overflow-hidden h-full group-hover:transform
                        group-hover:scale-[1.02]"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                    <Image
                                      src={`/${snippet.language}.png`}
                                      alt={`${snippet.language} logo`}
                                      className="relative z-10"
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                                      {snippet.language}
                                    </span>
                                    {snippet.isPrivate && (
                                      <div className="px-1 flex items-center mt-1 justify-center bg-green-600/50 rounded-full text-xs font-semibold">
                                        Private
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="absolute top-6 right-6 z-10"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <StarButton snippetId={snippet._id} />
                                </div>
                              </div>
                              <h2 className="text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                                {snippet.title}
                              </h2>
                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                  <BsClock className="w-4 h-4" />
                                  <span>
                                    {new Date(
                                      snippet._creationTime
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <BiChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                            <div className="px-6 pb-6">
                              <div className="bg-black/30 rounded-lg p-4 overflow-hidden">
                                <pre className="text-sm text-gray-300 font-mono line-clamp-3">
                                  {snippet.code}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {isLoadingSnippets ? (
                    <div className="text-center py-12">
                      <TbLoader2 className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        Loading code snippets...
                      </h3>
                    </div>
                  ) : (
                    executions.length === 0 && (
                      <div className="text-center py-12">
                        <BiCode className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">
                          No snippet yet
                        </h3>
                        <p className="text-gray-500">
                          Share snippet to see you snippets!.
                        </p>
                      </div>
                    )
                  )}

                  {/* Load More Button */}
                  {snippetStatus === "CanLoadMore" && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleLoadMoreSnippet}
                        className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg flex items-center gap-2 
                    transition-colors"
                      >
                        Load More
                        <BiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVE TAB IS PENS: */}
              {activeTab === "codepens" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pens?.map((pen) => (
                      <div key={pen._id} className="group relative">
                        <Link href={`/snippets/pen/${pen._id}`}>
                          <div
                            className="bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 
                          transition-all duration-300 overflow-hidden h-full group-hover:transform
                        group-hover:scale-[1.02]"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                    <Image
                                      src={`/html.png`}
                                      alt={`html logo`}
                                      className="relative z-10"
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                                      HTML
                                    </span>
                                    {pen.isPrivate && (
                                      <div className="px-1 flex items-center mt-1 justify-center bg-green-600/50 rounded-full text-xs font-semibold">
                                        Private
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="absolute top-6 right-6 z-10"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <StarPen penId={pen._id} />
                                </div>
                              </div>
                              <h2 className="text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                                {pen.title}
                              </h2>
                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                  <BsClock className="w-4 h-4" />
                                  <span>
                                    {new Date(
                                      pen._creationTime
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <BiChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                            <div className="px-6 pb-6">
                              <div className="bg-black/30 rounded-lg p-4 overflow-hidden">
                                <pre className="text-sm text-gray-300 font-mono line-clamp-3">
                                  {pen.html}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {isLoadingPens ? (
                    <div className="text-center py-12">
                      <TbLoader2 className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        Loading codePens...
                      </h3>
                    </div>
                  ) : (
                    executions.length === 0 && (
                      <div className="text-center py-12">
                        <BiCode className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">
                          No code pen yet
                        </h3>
                        <p className="text-gray-500">
                          Share code pen to see your code pen.
                        </p>
                      </div>
                    )
                  )}

                  {/* Load More Button */}
                  {penStatus === "CanLoadMore" && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleLoadMorePens}
                        className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg flex items-center gap-2 
                        transition-colors"
                      >
                        Load More
                        <BiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVE TAB IS STARRED SNIPPET: */}
              {activeTab === "starredSnippets" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {starredSnippets?.map((snippet) => (
                    <div key={snippet._id} className="group relative">
                      <Link href={`/snippets/${snippet._id}`}>
                        <div
                          className="bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 
                          transition-all duration-300 overflow-hidden h-full group-hover:transform
                        group-hover:scale-[1.02]"
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                  <Image
                                    src={`/${snippet.language}.png`}
                                    alt={`${snippet.language} logo`}
                                    className="relative z-10"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                                  {snippet.language}
                                </span>
                              </div>
                              <div
                                className="absolute top-6 right-6 z-10"
                                onClick={(e) => e.preventDefault()}
                              >
                                <StarButton snippetId={snippet._id} />
                              </div>
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                              {snippet.title}
                            </h2>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <BsClock className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    snippet._creationTime
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <BiChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          <div className="px-6 pb-6">
                            <div className="bg-black/30 rounded-lg p-4 overflow-hidden">
                              <pre className="text-sm text-gray-300 font-mono line-clamp-3">
                                {snippet.code}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <BiStar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        No starred snippets yet
                      </h3>
                      <p className="text-gray-500">
                        Start exploring and star the snippets you find useful!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVE TAB IS STARRED PENS: */}
              {activeTab === "starredPens" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {starredPens?.map((pen) => (
                    <div key={pen._id} className="group relative">
                      <Link href={`/snippets/pen/${pen._id}`}>
                        <div
                          className="bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 
                          transition-all duration-300 overflow-hidden h-full group-hover:transform
                        group-hover:scale-[1.02]"
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                  <Image
                                    src={`/html.png`}
                                    alt={`html logo`}
                                    className="relative z-10"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                                  HTML
                                </span>
                              </div>
                              <div
                                className="absolute top-6 right-6 z-10"
                                onClick={(e) => e.preventDefault()}
                              >
                                <StarPen penId={pen._id} />
                              </div>
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                              {pen.title}
                            </h2>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <BsClock className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    pen._creationTime
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <BiChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          <div className="px-6 pb-6">
                            <div className="bg-black/30 rounded-lg p-4 overflow-hidden">
                              <pre className="text-sm text-gray-300 font-mono line-clamp-3">
                                {pen.html}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <BiStar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        No starred pens yet
                      </h3>
                      <p className="text-gray-500">
                        Start exploring and star the snippets you find useful!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
