import { useState, useRef, useEffect } from "react";
import { Pencil, Check } from "lucide-react"; // Iconos

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ label, name, value, onChange }: FieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#53ACEC]">{label}</span>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          {isEditing ? <Check size={18} /> : <Pencil size={18} />}
          <span className="text-sm">{isEditing ? "Save" : "Edit"}</span>
        </button>
      </div>
      <div
        className={`w-full p-2 border rounded-lg bg-[#0F172A] text-white transition-all duration-200 ${
          isEditing ? "border-[#EF565D]" : "border-[#53ACEC]"
        }`}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none border-none text-white"
          />
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  );
};

export default Field;
