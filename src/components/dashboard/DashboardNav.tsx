"use client";

import { Home, Bell, Users, Medal } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import SearchBar from "@/components/ui/SearchBar";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "/", icon: Home, isActive: true },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    hasNotification: true,
  },
  { name: "My NFTs", href: "/nfts", icon: Medal },
  { name: "Volunteering", href: "/volunteering", icon: Users },
];

export default function DashboardNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);

      // Add transparency when scrolled
      setIsScrolled(currentScrollY > 10);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled ? "bg-[#0a0b1a]/95 backdrop-blur-sm" : "bg-[#0a0b1a]"
      )}
    >
      <nav className="container mx-auto">
        <div className="flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-[4rem]">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo_vc.svg" alt="Logo" width={130} height={65} />
              </Link>
            </div>
            <div className="relative hidden md:block">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center md:gap-24">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center px-5 py-2 rounded-full hover:bg-background"
                >
                  <Icon
                    className={clsx(
                      "h-[1.8rem] w-[1.8rem]",
                      item.isActive ? "text-primary" : "text-secondary"
                    )}
                  />
                  <span
                    className={clsx(
                      "hidden md:block dark:text-white text-sm mt-1",
                      item.isActive ? "text-primary" : "dark:text-white"
                    )}
                  >
                    {item.name}
                  </span>
                  {item.hasNotification && (
                    <span className="absolute left-9 md:left-16 top-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
