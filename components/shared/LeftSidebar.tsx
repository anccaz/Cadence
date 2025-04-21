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
    <section
      className="fixed top-0 left-0 h-screen w-64 border-r border-gray-800 flex flex-col justify-between z-40 custom-scrollbar"
      style={{ backgroundColor: "#121212" }}
    >
      {/* Navigation links */}
      <div className="flex flex-col gap-6 px-4 pt-16">
        {sidebarLinks.map((link) => {
          const route =
            link.route === "/profile" ? `${link.route}/${userId}` : link.route;
          const isActive =
            (pathname.includes(route) && route.length > 1) || pathname === route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`flex items-center gap-6 px-6 py-6 rounded-lg transition-colors duration-200 font-serif text-gray-200
                ${
                  isActive
                    ? "bg-gray-900 font-extrabold"
                    : "hover:bg-gray-900"
                }`}
              style={{ fontSize: "1.2rem" }}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className="font-medium font-serif text-gray-200 whitespace-nowrap max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Logout button at bottom */}
      <div className="px-4 pb-8">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4 rounded-lg hover:bg-red-900 transition">
              <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
              <p className="font-medium font-serif text-gray-200">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
