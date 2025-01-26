"use client";
import React from "react";
import Button from "./Button";
import NotFound from "../../../public/404.svg";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {LucideArrowLeft} from "lucide-react";
const Notfound = () => {
   const router = useRouter();
   const handleBack = () => {
      router.back();
   };
   return (
      <div className="  min-h-[90vh] sm:min-h-screen h-auto flex justify-center items-center pt-20  relative ">
         <Image src={NotFound} alt="not-found" />
         <section className="  absolute bottom-8 sm:bottom-0 flex justiify-center items-center flex-col w-full">
            <p className="text-[#ffffff] text-[18px] font-[800] text-center"> 404 - Page Not Found</p>
            <br />
            <Button variant="primary" textColor="secondary" className="text-white m-auto flex gap-2" onClick={handleBack}>
               <LucideArrowLeft /> Go Back 
            </Button>
         </section>
      </div>
   );
};

export default Notfound;
