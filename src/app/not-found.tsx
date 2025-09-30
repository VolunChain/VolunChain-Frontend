"use client";
import Notfound from "@/shared/components/ui/Notfound";
import Button from "@/shared/components/ui/Button";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#07081F] dark:text-white relative px-4 text-center">
      <Notfound />

      <div className="mt-8">
        <Button
          variant="primary"
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Page;
