"use client"
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { TbUserBitcoin } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";

export function NavigationHeader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent rendering on the server
  if (!isClient) return null;
  return (
    <header className="sticky inset-0 px-4 z-50 w-full py-1.5 bg-gray-900 border border-gray-800/50 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex gap-3 md:gap-[3rem] justify-center items-center">
          {/* Logo */}

          <div className="group flex justify-center items-center">
            <Link
              href="/"
              className="flex gap-2 justify-center items-center relative z-10"
            >
              <div className="absolute -z-10 w-full h-full transition-all duration-150 opacity-0 bg-gradient-to-r from-blue-400 via-blue-300 brightness-75 to-purple-400 rounded-3xl blur-xl group-hover:opacity-40" />
              <i className="flex justify-center items-center bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] group-hover:ring-blue-300 transition-all duration-150 ring-1 h-10 w-10 rounded-lg ring-gray-600 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="30"
                  viewBox="0 0 43 32"
                  fill="none"
                >
                  <path
                    d="M7.376 27.504C7.408 27.184 7.344 26.912 7.184 26.688C7.056 26.464 6.912 26.256 6.752 26.064C5.952 24.944 4.944 23.872 3.728 22.848C2.512 21.792 1.344 20.976 0.224 20.4L0.464 19.584C2.416 18.528 4.32 17.392 6.176 16.176C8.032 14.928 9.856 13.632 11.648 12.288C11.648 12.672 11.552 13.04 11.36 13.392C11.072 13.744 10.576 14.208 9.872 14.784C9.168 15.328 8.384 15.904 7.52 16.512C6.688 17.088 5.888 17.632 5.12 18.144C4.384 18.624 3.824 18.976 3.44 19.2C3.248 19.328 3.216 19.456 3.344 19.584C3.952 20 4.608 20.496 5.312 21.072C6.048 21.616 6.704 22.192 7.28 22.8C7.408 22.928 7.632 23.152 7.952 23.472C8.272 23.792 8.56 24.144 8.816 24.528C9.104 24.912 9.248 25.264 9.248 25.584C9.248 25.776 9.184 25.936 9.056 26.064C9.024 26.128 8.8 26.352 8.384 26.736C7.968 27.088 7.728 27.344 7.664 27.504H7.376ZM10.9745 31.536C10.6865 31.536 10.4465 31.504 10.2545 31.44C10.0625 31.408 9.9985 31.328 10.0625 31.2C11.4705 29.216 13.0545 27.072 14.8145 24.768C16.5745 22.432 18.3825 20.064 20.2385 17.664C22.0945 15.264 23.9025 12.976 25.6625 10.8C27.4545 8.592 29.0865 6.608 30.5585 4.848C32.0305 3.088 33.2305 1.712 34.1585 0.719999C34.2225 0.655998 34.3985 0.623998 34.6865 0.623998C34.9745 0.591998 35.2945 0.575998 35.6465 0.575998C36.0945 0.575998 36.5265 0.591998 36.9425 0.623998C37.3585 0.623998 37.5345 0.655998 37.4705 0.719999C36.7665 1.456 35.7425 2.592 34.3985 4.128C33.0865 5.632 31.5985 7.376 29.9345 9.36C28.2705 11.344 26.5425 13.408 24.7505 15.552C22.9905 17.696 21.2785 19.792 19.6145 21.84C17.9505 23.856 16.4625 25.696 15.1505 27.36C13.8385 28.992 12.8305 30.288 12.1265 31.248C12.0625 31.344 11.9185 31.408 11.6945 31.44C11.4705 31.504 11.2305 31.536 10.9745 31.536ZM31.9963 27.504C31.9963 27.344 31.8683 27.088 31.6123 26.736C31.3883 26.352 31.2443 26.128 31.1803 26.064C31.0523 25.776 31.2123 25.408 31.6603 24.96C32.1083 24.512 32.6203 24.08 33.1963 23.664C33.7723 23.248 34.1723 22.96 34.3963 22.8C35.2283 22.192 36.1243 21.616 37.0843 21.072C38.0443 20.496 38.9083 20 39.6763 19.584C39.8683 19.456 39.8843 19.328 39.7243 19.2C39.4363 18.976 39.0203 18.624 38.4763 18.144C37.9643 17.632 37.4043 17.088 36.7963 16.512C36.1883 15.904 35.6443 15.328 35.1643 14.784C34.7163 14.208 34.4283 13.744 34.3003 13.392V13.2C34.3003 13.04 34.3163 12.88 34.3483 12.72C34.4123 12.56 34.4603 12.416 34.4922 12.288C35.7083 13.632 36.9883 14.928 38.3323 16.176C39.6763 17.392 41.0843 18.528 42.5563 19.584L42.4603 20.4C41.5643 20.784 40.5723 21.28 39.4843 21.888C38.4283 22.496 37.3723 23.168 36.3163 23.904C35.2923 24.608 34.3643 25.328 33.5323 26.064C33.3083 26.256 33.0683 26.464 32.8123 26.688C32.5563 26.912 32.3803 27.184 32.2843 27.504H31.9963Z"
                    fill="#325C8C"
                  />
                </svg>
              </i>
              <div className="hidden md:block">
                <span className="bg-gradient-to-tr from-blue-400 to-purple-400 via-blue-300 bg-clip-text font-semibold text-xl text-transparent">
                  Code Daily
                </span>
                <p className="text-blue-400 text-sm font-medium">
                  Code in any language
                </p>
              </div>
            </Link>
          </div>

          {/* Snippet */}

          <Link href="/snippets" className="group">
            <div className="flex pr-3 pl-2 justify-center items-center bg-[#1a1a2e] hover:scale-105 transition-all duration-150 ring-1 rounded-md ring-gray-600/50 p-1">
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
              <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">
                Snippet
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Sign in */}
          <SignedOut>
            <Link href={"/pro"}>
              <div className="flex gap-1.5 justify-center items-center px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 rounded-md ring-[1px] ring-amber-300/50">
                <i>
                  <Image
                    src={"/sparkel.svg"}
                    alt="sparkle image"
                    width={14}
                    height={15}
                  />
                </i>
                <span className="text-[13px] text-amber-400 tracking-wide ">
                  Pro
                </span>
              </div>
            </Link>
          </SignedOut>
          <SignedOut>
            <SignInButton mode="modal">
              <div className="bg-blue-600 flex gap-2 items-center group rounded-full md:rounded-md py-2 px-3 hover:scale-105 transition- duration-150 cursor-pointer hover:bg-blue-700">
                <BiLogIn className="size-4"/>
                <span className="hidden md:block text-sm font-white/80 group-hover:text-white transition-colors">
                  Sign In
                </span>
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Profile"
                  labelIcon={<TbUserBitcoin className="size-4" />} // Ensure proper prop usage for the icon
                  href="/profile"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default NavigationHeader;
