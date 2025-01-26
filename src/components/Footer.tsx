import React from "react";
import Image from "next/image";

export default function Footer() {
   return (
      <footer className="text-white flex justify-center items-center py-16 mt-60">
         <div className="container mx-auto px-4 md:px-6 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-12">
               {/* Brand Section */}
               <div className="md:col-span-2 lg:w-[550px] flex flex-col items-center md:items-start">
                  <Image src="/logo.svg" alt="Logo" width={260} height={130} />
                  <p className=" font-[family-name:var(--font-fustat)] font-normal text-base md:text-base -mt-5 text-center md:text-left">
                     VolunChain is a blockchain-powered platform connecting volunteers with organizations. It ensures transparency, security, and rewards participation through
                     incentives like NFT collectibles, fostering collaboration in a Web3-driven ecosystem.
                  </p>
               </div>
               {/* Navigation Section */}
               <div className="md:col-span-1 lg:w-[220px] lg:ml-24 mt-10 flex flex-col items-center md:items-start">
                  <h3 className="font-[family-name:var(--font-fustat)] font-extrabold text-lg md:text-lg">Links</h3>
                  <ul className=" grid grid-rows-1 gap-2 mt-4 text-center md:text-left">
                     <li>
                        <a href="#explore" className="hover:text-gray-400 transition font-[family-name:var(--font-fustat)] font-normal text-base md:text-base">
                           Explore Volunteering
                        </a>
                     </li>
                     <li>
                        <a href="#terms" className="hover:text-gray-400 transition font-[family-name:var(--font-fustat)] font-normal text-base md:text-base">
                           Terms & Conditions
                        </a>
                     </li>
                     <li>
                        <a href="#privacy" className="hover:text-gray-400 transition font-[family-name:var(--font-fustat)] font-normal text-base md:text-base">
                           Privacy Policy
                        </a>
                     </li>
                     <li>
                        <a href="#contact" className="hover:text-gray-400 transition font-[family-name:var(--font-fustat)] font-normal text-base md:text-base">
                           Contact Us
                        </a>
                     </li>
                  </ul>
               </div>
               {/* Contact Section */}
               <div className="md:col-span-1 lg:w-[288px] lg:ml-12 mt-10 flex flex-col items-center md:items-start">
                  <h3 className="font-[family-name:var(--font-fustat)] font-extrabold text-lg md:text-lg">Contact</h3>
                  <div className="space-y-2 grid grid-rows-1 gap-3 text-center md:text-left">
                     <a
                        href="mailto:contact@volunchain.com"
                        className="hover:text-gray-400 transition font-[family-name:var(--font-fustat)] font-normal text-base md:text-base mt-3"
                     >
                        contact@volunchain.com
                     </a>
                  </div>

                  <div className="flex gap-8 mt-6">
                     <a href="https://x.com/volunchain?s=21" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Image src="/twitter.png" alt="Logo" width={30} height={30} />
                     </a>
                     <a href="https://github.com/volunchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors -mt-1">
                        <Image src="/telegram.png" alt="Logo" width={34} height={34} />
                     </a>
                     <a href="https://github.com/volunchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors -mt-1">
                        <Image src="/github.png" alt="Logo" width={38} height={37} />
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
