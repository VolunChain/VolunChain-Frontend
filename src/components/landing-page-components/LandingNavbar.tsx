import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { HamIcon, Menu } from "lucide-react";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsMenuOpen((prevState) => !prevState);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/mission", label: "Our Mission" },
    { path: "/users", label: "Users" },
    { path: "/social-media", label: "Social Media" },
  ];

  return (
    <nav className="w-full flex items-center justify-between p-6 mt-[-10px]">
      {" "}
      {/* Ajusté el margen superior aquí */}
      <Link href="/" className="text-white text-2xl font-semibold">
        <div className="w-40 lg:w-[226px] lg:h-[113px]">
          <img src="/logo.svg" className="w-full h-full" alt="logo" />
        </div>
      </Link>
      <div className="lg:hidden text-white">
        <Menu onClick={toggleMenu} />
      </div>
      <div
        className={`lg:flex items-center space-x-6 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "block absolute top-20 left-0 w-full py-4 bg-background"
            : "hidden"
        } lg:block lg:static lg:w-auto lg:space-x-6`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-7">
          {menuItems.map((link) => (
            <Link key={link.path} href={link.path}>
              <p className="text-white text-lg font-semibold">{link.label}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 px-5 lg:px-0">
          <Button
            variant="secondary"
            className="border-2 border-secondary text-secondary"
            textColor="secondary"
            type="button"
          >
            Contact us
          </Button>
          <Button
            variant="primary"
            className="bg-primary border border-primary "
            textColor="black"
            type="button"
          >
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
