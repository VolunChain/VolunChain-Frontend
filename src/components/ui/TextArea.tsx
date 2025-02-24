"use client";

interface TextAreaProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  className?: string;
  error?: string;
}

const TextArea = ({
  placeholder,
  label,
  value,
  onChange,
  name,
  className,
}: TextAreaProps) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-bold text-white">
          {label}
        </label>
      )}
      <textarea
        className="p-2 text-sm border rounded-[10px] bg-transparent text-white border-[#73b9eb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary pl-[15px] pr-[90px] py-[10px] w-full h-full"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        rows={4} cols={50}
      ></textarea>
    </div>
  );
};

export default TextArea;
