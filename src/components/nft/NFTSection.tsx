import React from "react";
import { nft_data } from "@/data/nft_data";
import NFTCard from "./NFTCard";

interface NFTSectionProps {
  selectedLabels: string[];
}

const NFTSection: React.FC<NFTSectionProps> = ({ selectedLabels }) => {
  const filteredNFTs = nft_data.filter((item) => {
    return (
      selectedLabels.length === 0 ||
      selectedLabels.includes(item.category) ||
      selectedLabels.includes(item.type) ||
      selectedLabels.includes(item.popularity) ||
      selectedLabels.includes(item.blockchainUtility)
    );
  });

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNFTs.map((item, index) => (
          <div key={index} className="nft-card-wrapper">
            <NFTCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTSection;
