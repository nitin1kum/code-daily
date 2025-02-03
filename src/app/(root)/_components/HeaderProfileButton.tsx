"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { BiLogIn } from "react-icons/bi";
import { TbUserBitcoin } from "react-icons/tb";
import { useEffect, useState } from "react";

function HeaderProfileButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted)
    return (
      <div className="flex items-center pl-3 border-gray-800 border-l">
        <div className="w-8 h-8 rounded-full bg-gray-800/50 animate-pulse" />
      </div>
    );

  return (
    <div className="pl-3 border-l border-gray-800 flex items-center">
      {/* Sign in */}
      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full md:rounded-lg
             transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
          >
            <BiLogIn className="w-4 h-4 transition-transform" />
            <span className="hidden md:block">Sign In</span>
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<TbUserBitcoin className="size-4" />}
              href="/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </div>
  );
}

export default HeaderProfileButton;
