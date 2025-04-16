"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200">
      <div className="flex flex-row flex-nowrap items-center justify-evenly w-full max-w-lg mx-auto font-medium">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex flex-col items-center justify-center p-2 ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="text-light-1">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
