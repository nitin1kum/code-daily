export const CardSkelton = () => {
    return (
        <div className="relative group">
            <div className="bg-[#1e1e2e]/80 rounded-lg sm:rounded-xl border border-[#313244]/50 overflow-hidden h-[288px]">
                <div className="p-6 space-y-4">
                    {/* header Shimmer */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-gray-300 animate-pulse"/>
                            <div className="space-y-2">
                                <div className="w-24 h-4 bg-gray-800 rounded-lg animate-pulse" />
                                <div className="w-16 h-4 bg-gray-800 rounded-lg animate-pulse" />
                            </div>
                        </div>
                        <div className="w-16 h-8 bg-gray-800 rounded-lg animate-pulse" />
                    </div>

                    {/* Title shimmer */}
                    <div className="space-y-2">
                        <div className="w-3/4 h-6 bg-gray-800 rounded-lg animate-pulse" />
                        <div className="w-1/2 h-6 bg-gray-800 rounded-lg animate-pulse" />
                    </div>

                    {/* Code Block shimmer */}
                    <div className="space-y-2 bg-black/60 rounded-lg p-4 ">
                        <div className="w-full h-4 bg-gray-800 rounded animate-pulse" />
                        <div className="w-3/4 h-4 bg-gray-800 rounded animate-pulse" />
                        <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SnippetPageSkelton(){
    return (
        <div className="min-h-screen bg-[#0a0a0f] relative p-2">
            {/* Ambient Background with loading pulses */}

            <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute top-[20%] -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            {/* Hero Search Skelton */}
            <div className="relative max-w-7xl mx-auto px-4 py-12">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="w-48 h-8 bg-gray-800 rounded-full mx-auto animate-pulse"/>
                    <div className="w-96 h-12 bg-gray-800 rounded-full mx-auto animate-pulse"/>
                    <div className="w-72 h-6 bg-gray-800 rounded-full mx-auto animate-pulse"/>
                </div>
            </div>

            {/* Search and Filters Skelton */}
            <div className="max-w-5xl mx-auto mb-12 space-y-6">
                {/* Search bar */}
                <div className="relative">
                    <div className="w-full h-14 bg-[#1e1e2e]/80 rounded-lg sm:rounded-xl border border-[#313244] animate-pulse"/>
                </div>

                {/* Language filter */}

                <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_,idx) => (
                        <div
                        key={idx}
                        className="w-24 h-8 bg-gray-800 rounded-lg animate-pulse"
                        style={{animationDelay:`${idx*100}ms`}}
                        />
                    ))}
                </div>

                {/* Grid Skelton */}

                <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    {[...Array(6)].map((_,idx) => (
                        <div key={idx}><CardSkelton/></div>
                    ))}
                </div>
            </div>
        </div>
    )
}