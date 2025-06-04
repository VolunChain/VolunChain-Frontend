"use client";
import React from "react";
import { nft_filters } from "@/data/nft_filters";
import Labels from "./Labels";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NFTFliterProps {
  selectedLabels: string[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<string[]>>;
  isOpen: boolean;
  onClose: () => void;
}

const NFTFliter: React.FC<NFTFliterProps> = ({
  selectedLabels,
  setSelectedLabels,
  isOpen,
  onClose,
}) => {
  const [openFilters, setOpenFilters] = React.useState<boolean[]>(
    nft_filters.map(() => true)
  );

  const toggleCategory = (index: number) => {
    setOpenFilters((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div
      className={`bg-bgsecondary p-5  z-50 md:mb-0 fixed md:static bottom-0 left-0 w-full md:w-auto transition-transform duration-300 ${
        isOpen
          ? "translate-y-0 rounded-t-xl"
          : "translate-y-full md:translate-y-0 rounded-xl"
      }`}
    >
      <div className="flex justify-end md:hidden mb-3">
        <button onClick={onClose} className="dark:text-white">
          Close
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {nft_filters?.map((filter, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{filter.name}</h3>
              <span
                onClick={() => toggleCategory(index)}
                className="cursor-pointer"
              >
                {openFilters[index] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </div>
            <div
              className={`flex flex-wrap gap-2 transition-all duration-500 overflow-hidden ${
                openFilters[index]
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              {filter.labels.map((label, idx) => (
                <div key={idx} onClick={() => toggleLabel(label)}>
                  <Labels
                    title={label}
                    isSelected={selectedLabels.includes(label)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTFliter;
