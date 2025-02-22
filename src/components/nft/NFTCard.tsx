import React from "react";

interface NFTItem {
  image_url: string;
  title: string;
  company_name: string;
  description: string;
  category: string;
  type: string;
  popularity: string;
  blockchainUtility: string;
}

interface NFTCardProps {
  item: NFTItem;
}

const NFTCard: React.FC<NFTCardProps> = ({ item }) => {
  return (
    <div className="bg-bgsecondary shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={item.image_url}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-[14px] text-blue mt-1 font-semibold">
          {item.company_name}
        </span>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <h4 className="text-white text-xs mt-1">{item.description}</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="py-1 px-3 rounded-full text-xs bg-blue text-bgsecondary">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
