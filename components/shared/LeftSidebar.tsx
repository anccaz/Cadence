"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="fixed top-0 left-0 h-screen w-64 border-r border-gray-300 bg-white flex flex-col justify-between z-40 custom-scrollbar">
      {/* Navigation links */}
      <div className="flex flex-col gap-6 px-4 pt-8">
        {sidebarLinks.map((link) => {
          const route = link.route === "/profile" ? `${link.route}/${userId}` : link.route;
          const isActive =
            (pathname.includes(route) && route.length > 1) || pathname === route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-primary-100 ${
                isActive ? "bg-primary-500" : "text-gray-700"
              }`}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              {/* Match bottom bar text style exactly */}
              <p className="font-medium text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Logout button at bottom */}
      <div className="px-4 pb-8">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4 rounded-lg hover:bg-red-50 transition">
              <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
              <p className="font-medium text-light-2">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
