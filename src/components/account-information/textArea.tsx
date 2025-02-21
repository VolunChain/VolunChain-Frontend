import { useState } from "react";
import { Pencil, Check } from "lucide-react";

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ label, name, value, onChange }: TextAreaProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-[#53ACEC]">{label}</span>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          {isEditing ? <Check size={16} /> : <Pencil size={16} />}
          <span className="text-xs">{isEditing ? "Save" : "Edit"}</span>
        </button>
      </div>
      <div
        className={`w-full p-3 border-[0.5px] rounded-lg bg-[#0F172A] text-white transition-all duration-200 ${
          isEditing ? "border-[#EF565D]" : "border-[#53ACEC]"
        }`}
      >
        {isEditing ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none border-none text-xs resize-none"
            rows={4}
          />
        ) : (
          <p className="text-xs">{value}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
