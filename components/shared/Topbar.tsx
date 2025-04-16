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
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-40 custom-scrollbar">
      <nav className="flex flex-col gap-6 px-6 pt-8">
        {sidebarLinks.map((link) => {
          const route = link.route === "/profile" ? `${link.route}/${userId}` : link.route;
          const isActive =
            (pathname.includes(route) && route.length > 1) || pathname === route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`flex items-center gap-4 py-3 px-2 rounded-lg transition-colors duration-200 hover:bg-primary-100 ${
                isActive ? "bg-primary-500 text-white" : "text-gray-700"
              }`}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <span className="text-base font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pb-8">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <button className="flex items-center gap-4 w-full py-3 px-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200">
              <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
              <span className="font-medium">Logout</span>
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </aside>
  );
};

export default LeftSidebar;
