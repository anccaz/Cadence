"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section
      className="fixed bottom-0 left-0 w-full z-50 border-t border-gray-800"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="flex flex-row flex-nowrap items-center justify-center w-full max-w-lg mx-auto pt-6 gap-x-8">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg font-serif text-gray-200 transition-colors duration-200
                ${isActive ? "bg-purple-900" : "hover:bg-purple-700"}`}
              style={{ fontSize: "1.2rem" }}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="font-serif text-gray-200 whitespace-nowrap" style={{ fontSize: "1.2rem" }}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
