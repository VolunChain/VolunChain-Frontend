"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DashboardNav from "../dashboard/DashboardNav";
import NotFound from "../../../public/404image.png";

const Notfound = () => {
   const router = useRouter();

   return (
      <div className="flex flex-col justify-between min-h-screen bg-[#07081F] text-white relative">
         <DashboardNav />

         <div className="flex flex-col items-center flex-grow relative px-4 text-center mt-24">
            <h1 className="text-3xl sm:text-4xl font-bold max-w-[90%] sm:max-w-[70%] leading-tight">
               Oops! It seems this page <br /> can’t be reached...
            </h1>
            <p className="text-gray-400 mt-2 max-w-lg leading-relaxed">
               It looks like you’ve wandered off the beaten path. But don’t worry—there are still plenty of ways to make a difference!
            </p>

            <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[35rem] font-bold text-[#2D3248] opacity-60 select-none w-full">
               404
               </div>

               <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[35rem] font-bold text-[#2D3248] opacity-90 select-none w-full">
               </div>
               <div className="absolute inset-0 w-50 h-25 bg-gradient-to-t from-[#0B0E1E] via-[#0F1327] to-transparent opacity-70"></div>


            <div className="relative max-w-lg w-full mt-20">
               <Image 
                  src={NotFound} 
                  alt="Not Found" 
                  className="w-full h-auto object-contain" 
                  priority
               />
               <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0B0E1E] via-[#0F1327] to-transparent opacity-90"></div>
            </div>
         </div>

      </div>
   );
};

export default Notfound;
