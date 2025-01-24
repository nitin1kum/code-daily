"use client";
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import SnippetPageSkelton from "./_components/SnippetPageSkelton";
import NavigationHeader from "@/components/NavigationHeader";
import { AnimatePresence, delay, motion } from "framer-motion";
import {
  BiBookOpen,
  BiGrid,
  BiLayer,
  BiSearch,
  BiTag,
  BiX,
} from "react-icons/bi";
import SnippetCard from "./_components/SnippetCard";

const SnippetsPage = () => {
  const snippets = useQuery(api.snippet.getSnippet);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetPageSkelton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map(s => s.language))]
  const popularLanguages = languages.slice(0,5);

  const filteredSnippets = snippets.filter(snippet => {
    const searchMatches = snippet.title.toLowerCase().includes(searchQuery) ||
                          snippet.userName.toLowerCase().includes(searchQuery) ||
                          snippet.language.toLowerCase().includes(searchQuery);

    const langMatches = !selectedLanguage || snippet.language === selectedLanguage;

    return searchMatches && langMatches;
  })

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="relative max-w-7xl mx-auto py-12">
        {/* Hero */}

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
          >
            <BiBookOpen className="size-4" />
            Explore Ideas Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6"
          >
            Discover & Share Code Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-6"
          >
            Explore a great collection of ideas in form of code
          </motion.p>
        </div>

        {/* Filter Section */}

        <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <BiSearch className="absolute left-4 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="w-full pl-12 pr-4 py-4 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
            <BiTag className="size-4 text-gray-400" />
            <span className="text-sm text-gray-400">Languages: </span>
          </div>

          {popularLanguages.map((lang, idx) => (
            <button
              key={idx}
              onClick={() =>
                setSelectedLanguage(lang === selectedLanguage ? null : lang)
              }
              className={`group relative px-3 py-1.5 rounded-lg transition-all duration-200 ${lang === selectedLanguage ? "text-blue-400 bg-blue-500/10 ring-2 ring-blue-500/50" : "text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800"}`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={`/${lang}.png`}
                  alt={lang}
                  className="size-4 object-contain"
                />
                <span className="text-sm">{lang}</span>
              </div>
            </button>
          ))}

          {selectedLanguage && (
            <button
              onClick={() => setSelectedLanguage(null)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gra-400 hover:text-gray-300 transition-colors"
            >
              <BiX className="size-4" />
              Clear
            </button>
          )}

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500">{filteredSnippets.length} snippets found</span>
          </div>

          {/* view Toggle */}

          <div className="flex items-center gap-1 p-1 bg[#1e1e2e] rounded-lg ring-1 ring-gray-800">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-sm transition-all ${view === "grid" ? "bg-blue-500/2. text-blue-400" : "text=gray-400 hover:text-gray-300 hover:bg-[#262637]"}`}
            >
              <BiGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-sm transition-all ${view === "list" ? "bg-blue-500/2. text-blue-400" : "text=gray-400 hover:text-gray-300 hover:bg-[#262637]"}`}
            >
              <BiLayer className="size-4" />
            </button>
          </div>
        </div>

        </div>
        
        {/* Snippets */}

        <motion.div
        className={`grid gap-6 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto"}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet}/>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SnippetsPage;
