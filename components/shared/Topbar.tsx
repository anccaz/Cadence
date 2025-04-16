"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

const Topbar = () => {
  const router = useRouter();

  return (
    <header className="h-16 w-full bg-white border-b border-gray-200 flex items-center justify-center px-6 shadow-sm z-30">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        {/* Title */}
        <h1 className="text-xxl font-semibold text-gray-10000">Cadence</h1>
        {/* Optional: User actions */}
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <button className="ml-6 text-red-600 hover:text-red-800 font-medium transition-colors">
              Logout
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </header>
  );
};

export default Topbar;
