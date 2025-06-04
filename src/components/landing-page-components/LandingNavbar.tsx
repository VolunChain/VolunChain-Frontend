"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";

const LandingNavbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsMenuOpen((prevState) => !prevState);

  const menuItems = [
    { path: "#home", label: t("navbar.home") },
    { path: "#mission", label: t("mission.title") },
    { path: "#users", label: t("navbar.users") },
    { path: "#social-media", label: t("navbar.socialMedia") },
  ];

  return (
    <nav className="w-full flex items-center justify-between p-6 mt-[-10px]">
      {" "}
      <Link href="/" className="dark:text-white text-2xl font-semibold">
        <div className="w-40 lg:w-[226px] lg:h-[113px]">
          <img src="/logo.svg" className="w-full h-full" alt="logo" />
        </div>
      </Link>
      <div className="lg:hidden dark:text-white">
        <Menu
          onClick={toggleMenu}
          aria-label={t("navbar.ariaLabels.mobileMenuToggle")}
          role="button"
          tabIndex={0}
        />
      </div>
      <div
        className={`lg:flex items-center space-x-6 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "block absolute top-20 left-0 w-full bg-background py-4"
            : "hidden"
        } lg:block lg:static lg:w-auto lg:space-x-6`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-7">
          {menuItems.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                const targetId = link.path.replace("#", "");
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
                setIsMenuOpen(false);
              }}
            >
              <p className="dark:dark:text-white text-lg font-semibold">
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 px-5 lg:px-0">
          <div className="lg:mr-2">
            <LanguageSwitcher />
          </div>
          <div className="lg:mr-2">
            <ThemeToggle />
          </div>
          <Button
            variant="secondary"
            className="border-2 border-secondary text-secondary"
            textColor="secondary"
            type="button"
            aria-label={t("navbar.ariaLabels.contactUs")}
          >
            {t("navbar.contactUs")}
          </Button>
          <Button
            variant="primary"
            className="bg-primary border border-primary"
            textColor="black"
            type="button"
            aria-label={t("navbar.ariaLabels.login")}
          >
            {t("navbar.login")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
