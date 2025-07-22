"use client";

import { ChevronDown } from "lucide-react";

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  className?: string;
  error?: string;
  placeholder?: string;
}

const Select = ({
  label,
  options,
  value,
  onChange,
  name,
  className,
  placeholder,
}: SelectProps) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-sm font-bold dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          className="p-2 text-sm border rounded-[10px] bg-transparent dark:text-white border-[#73b9eb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary pl-[15px] pr-[90px] py-[10px] w-full h-full appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="text-[#73B9EB]" />
        </span>
      </div>
    </div>
  );
};

export default Select;
