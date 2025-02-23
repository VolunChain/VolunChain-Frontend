"use client";
import React, { useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import NFTFliter from "@/components/nft/NFTFliter";
import { FilterIcon } from "lucide-react";

const NFTPage = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <DashboardNav />
      <div className="container mx-auto px-4 pt-24">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden bg-blue px-3 py-2 rounded-full shadow-lg flex gap-1 items-center text-bgsecondary mb-4"
        >
          <FilterIcon size={20} />
          <span>Filter</span>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
          <NFTFliter
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
