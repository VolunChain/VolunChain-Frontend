import React from "react";

interface LabelsProps {
  title: string;
  isSelected?: boolean;
}

const Labels: React.FC<LabelsProps> = ({ title, isSelected }) => {
  return (
    <div
      className={`border-2 border-blue py-3 px-4 rounded-full text-xs cursor-pointer transition-all duration-500 ease-in-out ${
        isSelected ? "bg-blue text-white" : "bg-transparent text-blue"
      }`}
    >
      {title}
    </div>
  );
};

export default Labels;
