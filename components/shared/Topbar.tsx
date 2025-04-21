"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

const Topbar = () => {
  const router = useRouter();

  return (
    <header
      style={{ backgroundColor: "#121212" }} 
      className="h-32 w-full border-b border-gray-800 flex items-center justify-center px-6 shadow-sm z-30"
    >
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={70} height={110} />
        {/* Title */}
        <h1 className="font-extrabold font-serif text-gray-200 tracking-tight" style={{ fontSize: "5rem", lineHeight: 1.1 }}>
          Cadence
        </h1>
        <Image src="/logo.png" alt="Logo" width={70} height={110} />
        {/* Optional: User actions */}
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
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
