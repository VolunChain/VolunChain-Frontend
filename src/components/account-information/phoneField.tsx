import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneField = ({ label, name, value, onChange }: PhoneFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const customStyles = {
    dropdownStyle: {
      backgroundColor: "#0F172A",
      border: "1px solid #53ACEC",
    },
    searchStyle: {
      backgroundColor: "#16213E",
      color: "#FFFFFF",
    },
  };

  return (
    <div className="flex flex-col gap-1">
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
        className={`relative w-full p-2 border rounded-lg bg-[#0F172A] text-white transition-all duration-200 ${
          isEditing ? "border-[#EF565D]" : "border-[#53ACEC]"
        }`}
      >
        {isEditing ? (
          <PhoneInput
            country="us"
            value={value}
            onChange={onChange}
            containerClass="!w-full"
            inputClass="!w-full !p-2 !pl-14 !text-white !bg-[#0F172A] !border-none !rounded-lg focus:!ring-2 focus:!ring-[#EF565D]"
            buttonClass="!absolute !left-2 !top-1/2 !transform !-translate-y-1/2 !bg-transparent !border-none"
            dropdownStyle={customStyles.dropdownStyle}
            searchStyle={customStyles.searchStyle}
            dropdownClass="custom-phone-dropdown"
          />
        ) : (
          <p>{value}</p>
        )}
      </div>

      <style jsx>{`
        .custom-phone-dropdown {
          background-color: #0F172A !important;
          border: 1px solid #53ACEC !important;
        }
        .custom-phone-dropdown .country {
          color: #FFFFFF !important;
        }
        .custom-phone-dropdown .country:hover {
          background-color: #16213E !important;
          color: #D1D5DB !important;
        }
        .custom-phone-dropdown .country.highlight {
          background-color: #1E293B !important;
        }
      `}</style>
    </div>
  );
};

export default PhoneField;
