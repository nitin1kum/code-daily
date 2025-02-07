"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import { BiChevronLeft } from "react-icons/bi";

function SideBar({ isPro }: { isPro: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`responsinve-nav transition-transform duration-200 fixed sm:hidden ${isOpen ? "translate-x-0" : "translate-x-full"} top-1/2 -translate-y-1/2 mt-2 right-0 z-50 bg-[#1e1e2e] backdrop-blur-xl rounded-lg flex items-center justify-start gap-2 flex-col p-4`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-1.5 top-1/2 -translate-y-1/2 rounded-l-xl py-4 absolute bg-gray-800/50 -left-0 -translate-x-full"
      >
        <BiChevronLeft
          className={`size-8 ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
        />
      </button>
      <Link href="/snippets" className="group w-full">
        <div className="flex pr-3 pl-2 py-1 rounded-full justify-center items-center bg-[#1a1a2e] hover:scale-105 transition-all duration-150 ring-1 md:rounded-md ring-gray-600/50">
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="16"
              viewBox="0 0 38 16"
              fill="none"
            >
              <path
                d="M11.376 15.504C11.408 15.184 11.344 14.912 11.184 14.688C11.056 14.464 10.912 14.256 10.752 14.064C9.952 12.944 8.944 11.872 7.728 10.848C6.512 9.792 5.344 8.976 4.224 8.4L4.464 7.584C6.416 6.528 8.32 5.392 10.176 4.176C12.032 2.928 13.856 1.632 15.648 0.287999C15.648 0.671999 15.552 1.04 15.36 1.392C15.072 1.744 14.576 2.208 13.872 2.784C13.168 3.328 12.384 3.904 11.52 4.512C10.688 5.088 9.888 5.632 9.12 6.144C8.384 6.624 7.824 6.976 7.44 7.2C7.248 7.328 7.216 7.456 7.344 7.584C7.952 8 8.608 8.496 9.312 9.072C10.048 9.616 10.704 10.192 11.28 10.8C11.408 10.928 11.632 11.152 11.952 11.472C12.272 11.792 12.56 12.144 12.816 12.528C13.104 12.912 13.248 13.264 13.248 13.584C13.248 13.776 13.184 13.936 13.056 14.064C13.024 14.128 12.8 14.352 12.384 14.736C11.968 15.088 11.728 15.344 11.664 15.504H11.376Z"
                fill="#325C8C"
              />
              <path
                d="M25.56 15.088C25.176 15.056 24.76 15.024 24.312 14.992C23.896 14.928 23.368 14.896 22.728 14.896C21.992 14.896 21.304 14.912 20.664 14.944C20.056 14.944 19.384 14.976 18.648 15.04C18.584 15.04 18.616 14.928 18.744 14.704C18.872 14.48 19.032 14.256 19.224 14.032C19.448 13.808 19.608 13.712 19.704 13.744C20.056 13.808 20.504 13.856 21.048 13.888C21.624 13.888 22.216 13.904 22.824 13.936C23.656 13.936 24.392 13.92 25.032 13.888C25.672 13.856 26.2 13.824 26.616 13.792C26.68 13.792 26.648 13.904 26.52 14.128C26.392 14.352 26.232 14.576 26.04 14.8C25.848 14.992 25.688 15.088 25.56 15.088Z"
                fill="#325C8C"
              />
            </svg>
          </i>
          <span className="block sm:hidden md:block text-gray-400 text-sm group-hover:text-gray-200 transition-colors">
            Snippet
          </span>
        </div>
      </Link>
      <ThemeSelector />
      <LanguageSelector hasAccess={isPro || false} />
      {/* Pro button */}
      {!isPro && (
        <Link href={"/pricing"} className="w-full">
          <div className="flex w-full gap-1.5 justify-center rounded-full min-w-[40px] items-center px-3 py-1 bg-amber-400 md:rounded-md ring-[1px] ring-amber-300/50 bg-opacity-25">
            <i>
              <Image
                src={"/sparkel.svg"}
                alt="sparkle image"
                width={14}
                height={15}
              />
            </i>
            <span className=" text-[13px] text-amber-400 tracking-wide ">
              Pro
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}

export default SideBar;
