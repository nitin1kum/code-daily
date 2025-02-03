"use client";

import NavigationHeader from "@/components/NavigationHeader";

function PenLoadingSkelton() {
  const lineWidth = [26, 25, 85, 60, 68, 52, 32, 35, 47, 48, 59];
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <div className="relative py-6 sm:py-8 lg:py-12 ">
        {/* header */}
        <div className="relative group bg-gray-800 py-6 px-4 mb-8 max-w-7xl mx-auto rounded-xl ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-[#1e1e2e]/80 border border-gray-400/20 animate-pulse" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-48 h-6 bg-[#1e1e2e]/80 animate-pulse rounded-lg" />
                <div className="flex items-center gap-2">
                  <div className="bg-[#1e1e2e]/80 rounded-lg animate-pulse w-24 h-4" />
                  <div className="bg-[#1e1e2e]/80 rounded-lg animate-pulse w-20 h-4" />
                  <div className="bg-[#1e1e2e]/80 rounded-lg animate-pulse w-8 h-4" />
                </div>
              </div>
            </div>
            <div className="bg-[#1e1e2e]/80 w-12 h-6 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Code Panel */}

        <div className="relative bg-gray-800 max-w-7xl mx-auto rounded-xl p-6">
          <div className="flex flex-col gap-3">
            {/* header */}
            <div className="flex justify-between items-center gap-2">
              <div className="bg-[#1e1e2e]/80 w-24 h-8 animate-pulse rounded-lg" />
              <div className="bg-[#1e1e2e]/80 w-12 h-8 animate-pulse rounded-lg" />
            </div>

            {/* Code */}
            <div className="h-full w-full min-h-[600px] bg-gray-900/80 p-4 rounded-xl realtive">
              <div className="absolue inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
              {lineWidth.map((_, i) => (
                <div className="flex items-center gap-3 py-1.5" key={i}>
                  <div className="bg-[#1e1e2e]/80 animate-pulse w-12 h-5 rounded-lg" />
                  <div
                    className="bg-[#1e1e2e]/80 rounded-lg h-5 animate-pulse"
                    style={{ width: `${_}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PenLoadingSkelton;
