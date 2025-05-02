import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider,SignedIn, SignedOut, RedirectToSignIn  } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadence",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
       baseTheme: dark,
      }}
    >
      <SignedIn>{children}</SignedIn>
      <SignedOut>
            <RedirectToSignIn />
      </SignedOut> 
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
       
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
