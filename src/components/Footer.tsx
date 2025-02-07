"use client"
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  
  return (
    <footer className=''>
      <div className='-top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent'/>
      <div className='flex md:justify-between px-[10%] py-3 md:py-6 md:flex-row flex-col justify-center items-center gap-2'>
      <div className=' text-gray-400'>
        By developer, for developer
      </div>
      <div className='flex gap-4 text-gray-400'>
        <Link href='/support' className='text-sm font-medium sm:text-base hover:text-gray-300'>Support</Link>
        <Link href='/privacy' className='text-sm font-medium sm:text-base hover:text-gray-300'>Privacy</Link>
        <Link href='/terms'   className='text-sm font-medium sm:text-base hover:text-gray-300'>Terms</Link>
      </div>
      </div>
    </footer>
  )
}

export default Footer