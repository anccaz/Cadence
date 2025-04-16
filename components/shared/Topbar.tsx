"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

const Topbar = () => {
  const router = useRouter();

  return (
    <header className="h-16 w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-30">
      {/* Left side - Logo or title */}
      <div className="flex items-center gap-4">
        {/* Example logo */}
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right side - User actions */}
      <div className="flex items-center gap-4">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <button className="text-red-600 hover:text-red-800 font-medium transition-colors">
              Logout
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </header>
  );
};

export default Topbar;
