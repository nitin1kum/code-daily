import React from 'react'

function ProfileHeaderSkelton() {
  return (
    <div className='bg-gradient-to-br from-purple-400/10 p-6 via-purple-500/10 mb-8 to-blue-500/10 rounded-xl'>
        <div className="flex items-center  gap-5">
            <div className="w-20 h-20 rounded-full bg-gray-800 animate-pulse" />
            <div className="">
                <div className="flex flex-col sm:flex-row gap-2 items-start mb-2">
                    <div className="w-48 h-8 bg-gray-800 rounded-lg animate-pulse" />
                    <div className="w-36 h-5 bg-gray-800 rounded-lg animate-pulse" />
                </div>
                <div className="flex items-center gap-1 space-y-2">
                    <div className="w-48 h-4 bg-gray-800 rounded-lg animate-pulse" />
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-8 gap-8">
            <div className="w-full h-40 bg-gray-800 animate-pulse rounded-lg" />
            <div className="w-full h-40 bg-gray-800 animate-pulse rounded-lg" />
            <div className="w-full h-40 bg-gray-800 animate-pulse rounded-lg" />
        </div>
    </div>
  )
}

export default ProfileHeaderSkelton