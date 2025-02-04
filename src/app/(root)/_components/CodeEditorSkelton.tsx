"use client";

export function CodePanelSkelton() {
  const size = [
    20, 40, 60, 50, 20, 30, 45, 55, 68, 95, 12, 78, 56, 89, 25, 35, 14,
  ];
  return (
    <div className="relative w-full lg:w-1/2">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div className="bg-gray-800/50 h-8 w-8 rounded-lg animate-pulse" />
            <div className="flex flex-col gap-1">
              <div className="h-4 space-y-1 w-24 bg-gray-800/50 rounded-lg animate-pulse" />
              <div className="h-3 w-48 bg-gray-800/50 rounded-md animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Font Size Slider */}

            <div className="h-9 w-36 bg-gray-800/50 animate-pulse rounded-lg" />

            {/* Refresh button */}
            <div className="h-9 w-8 bg-gray-800/50 rounded-lg animate-pulse" />
            {/* Share button */}
            <div className="h-9 w-8 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Editor Area Skelton */}

        <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] h-[400px] md:h-[600px]">
          <div className="h-full relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
            <div className="absolue inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
            <div className="h-full bg-[#1e1e2e]/50 backdrop-blur-sm p-4">
              {/* Code line Skelton */}
              {size.map((_, i) => (
                <div key={i} className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-4 bg-white/5 rounded animate-pulse" />
                  <div
                    className="h-4 bg-white/5 rounded animate-pulse"
                    style={{ width: `${_}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolue bg-gradient-to-r inset-0 via-transparent from-blue-500/50 to-purple-500/50 rounded-xl blue-2xl" />
    </div>
  );
}
