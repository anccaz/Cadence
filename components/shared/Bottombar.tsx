"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";

//written by: Annie Li

function Bottombar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section
      className="fixed bottom-0 left-0 w-full z-50 border-t border-gray-800"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="flex flex-row flex-nowrap items-center justify-center w-full max-w-lg mx-auto pt-4 pb-2 gap-x-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg font-serif transition-colors duration-200
                ${
                  isActive
                    ? "bg-[#B9A9DE] text-[#4B3F72]"
                    : "text-white"
                }
                hover:bg-[#D6CBEF] hover:text-[#4B3F72]"
              `}
              style={{ fontSize: "1.2rem" }}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="font-serif whitespace-nowrap" style={{ fontSize: "1.2rem" }}>
                {link.label}
              </span>
            </Link>
          );
        })}

        {/* Logout button at the end */}
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg cursor-pointer font-serif text-white transition-colors duration-200 hover:bg-[#B9A9DE] hover:text-[#4B3F72]" style={{ fontSize: "1.2rem" }}>
              <Image src="/assets/logout.svg" alt="logout" width={24} height={24} className="object-contain" />
              <span className="font-serif" style={{ fontSize: "1.2rem" }}>
                Logout
              </span>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default Bottombar;
