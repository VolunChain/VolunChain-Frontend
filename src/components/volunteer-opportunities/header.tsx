"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Search, ChevronRightCircle, ChevronLeftCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const categories = [
  "Education",
  "Healthcare",
  "Environment",
  "Social Services",
  "Animal Welfare",
  "Arts & Culture",
  "Health and Well-being",
  "Disaster Relief and Emergency Response",
];

const OpportunitiesHeader = () => {
  const [search, setSearch] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleButtons, setVisibleButtons] = useState<number>(4);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const updateVisibleButtons = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleButtons(1);
      else if (width < 768) setVisibleButtons(2);
      else if (width < 1024) setVisibleButtons(3);
      else setVisibleButtons(4);
    };

    updateVisibleButtons();
    window.addEventListener("resize", updateVisibleButtons);
    return () => window.removeEventListener("resize", updateVisibleButtons);
  }, []);

  const handleSlide = (direction: "left" | "right") => {
    if (direction === "left") {
      setActiveIndex((prev) =>
        prev === 0 ? categories.length - visibleButtons : prev - 1
      );
    } else {
      setActiveIndex((prev) =>
        prev === categories.length - visibleButtons ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="w-full px-[10px] md:px-[30px] pt-[25px] md:pt-[40px] bg-transparent max-w-7xl mx-auto">
      <div className="w-full h-fit lg:h-[328px] rounded-[37px] bg-[#0F112B] flex flex-col lg:flex-row py-[20px] lg:py-[30px] px-[30px] lg:px-[45px] gap-[10px]">
        <div className="flex flex-col items-start justify-center w-full lg:w-1/2 h-fit gap-[25px] lg:gap-[50px]">
          <h1 className="dark:text-white text-[28px] sm:text-[32px] lg:text-[38px] font-[800]">
            Where would you like to help today?
          </h1>
          <div className="flex relative w-full lg:w-2/3 h-[54px]">
            <Input
              type="text"
              placeholder="Search volunteering options"
              value={search}
              name="options"
              onChange={(e) => handleSearch(e)}
              className="w-full h-full dark:text-white text-opacity-50 text-[24px] font-[700]"
            />
            <div className="w-[40px] h-[40px] rounded-[5px] bg-[#73B9EB] absolute right-2 top-2 flex items-center justify-center">
              <Search color="black" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-full">
          <Image
            src="/images/volunteering-header.svg"
            width={500}
            height={500}
            alt="Volunteering Header"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="my-6 relative flex gap-8 items-center w-full mx-auto">
        <ChevronLeftCircle
          onClick={() => handleSlide("left")}
          strokeWidth={1}
          className="w-[50px] lg:w-[80px] h-[50px] lg:h-[80px] rounded-full text-[#73B9EB] absolute left-0 z-10"
        />

        <div className="flex items-center justify-center gap-[10px] overflow-hidden mx-auto w-full py-[10px]">
          {categories
            .slice(activeIndex, activeIndex + visibleButtons)
            .map((category, index) => (
              <Button
                key={index}
                variant="primary"
                type="button"
                textColor="black"
              >
                {category}
              </Button>
            ))}
        </div>

        <ChevronRightCircle
          strokeWidth={1}
          onClick={() => handleSlide("right")}
          className="w-[50px] lg:w-[80px] h-[50px] lg:h-[80px] rounded-full text-[#73B9EB] absolute right-4 z-10"
        />
      </div>
    </div>
  );
};

export default OpportunitiesHeader;
