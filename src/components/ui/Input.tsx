"use client";

interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  error?: string;
}

const Input = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  name,
  className,
}: InputProps) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-bold text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className="p-2 text-sm border rounded-[10px] bg-transparent text-white border-[#73b9eb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary pl-[15px] pr-[90px] py-[10px] w-full h-full"
      />
    </div>
  );
};

export default Input;
