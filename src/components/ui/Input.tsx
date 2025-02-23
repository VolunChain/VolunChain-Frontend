"use client";

interface InputProps {
  type?: "text" | "checkbox" | "email" | "date" | "password" | "tel";
  placeholder?: string;
  label?: string;
  value?: string | boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  error?: string;
  checked?: boolean;
}

const Input = ({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  name,
  className,
  checked,
}: InputProps) => {
  return (
    <div
      className={`flex ${
        type === "checkbox" ? "items-center" : "flex-col mb-4"
      } ${className}`}
    >
      {type === "checkbox" ? (
        <>
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={Boolean(checked)}
            onChange={onChange}
            className="w-4 h-4 p-2 text-sm border rounded-[10px] bg-[#1A1C37] text-[#53ACEC] border-[#73b9eb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary pl-[15px] pr-[90px] py-[10px]"
          />
          {label && (
            <label
              htmlFor={name}
              className="ms-2 text-sm font-medium text-[#53ACEC]"
            >
              {label}
            </label>
          )}
        </>
      ) : (
        <>
          {label && (
            <label htmlFor={name} className="mb-2 text-sm font-bold text-white">
              {label}
            </label>
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
            id={name}
            name={name}
            className="p-2 text-sm border rounded-[10px] bg-transparent text-white border-[#73b9eb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary pl-[15px] pr-[90px] py-[10px] w-full h-full"
          />
        </>
      )}
    </div>
  );
};

export default Input;
