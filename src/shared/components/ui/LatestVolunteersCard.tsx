import Image from "next/image";
import React from "react";

interface LatestVolunteersCardProps {
  companyName: string;
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
}

const LatestVolunteersCard: React.FC<LatestVolunteersCardProps> = ({
  companyName,
  title,
  description,
  categories,
  imageUrl,
}) => {
  return (
    <div className="w-full md:w-[400px] h-[500px] bg-[#0F112B] rounded-[24px] overflow-hidden">
      <div className="relative w-full h-[250px]">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-col items-start p-[25px] gap-[10px]">
        <span className="text-secondary font-[800] text-[14px] leading-[20px]">
          {companyName}
        </span>

        <h3 className="dark:text-white font-[700] text-[20px] leading-[28px]">
          {title}
        </h3>

        <p className="dark:text-white font-[400] text-[14px] leading-[20px] max-w-[350px]">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-[8px] pt-[10px]">
          {categories.map((category, index) => (
            <span
              key={index}
              className="bg-secondary text-tertiary px-[20px] py-[5px] rounded-[48px] text-[14px] font-[600] leading-[20px]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestVolunteersCard;
