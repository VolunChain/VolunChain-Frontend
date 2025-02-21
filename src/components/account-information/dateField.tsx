import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFieldProps {
  label: string;
  name: string;
  value: Date;
  onChange: (date: Date | null) => void;
}

const DateField = ({ label, name, value, onChange }: DateFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
          <DatePicker
            selected={value}
            onChange={(date) => {
              if (date) onChange(date);
              setIsEditing(false);
            }}
            className="w-full bg-transparent outline-none border-none text-white"
            calendarClassName="custom-datepicker"
            dateFormat="MM/dd/yyyy"
            popperClassName="custom-popper"
          />
        ) : (
          <p>{value.toLocaleDateString()}</p>
        )}
      </div>

      <style jsx global>{`
        .custom-datepicker {
          background-color: #0F172A !important;
          border: 1px solid #53ACEC !important;
          color: white !important;
        }
        .custom-datepicker .react-datepicker__header {
          background-color: #16213E !important;
          border-bottom: 1px solid #53ACEC !important;
        }
        .custom-datepicker .react-datepicker__day {
          color: white !important;
        }
        .custom-datepicker .react-datepicker__day:hover {
          background-color: #1E293B !important;
          color: #53ACEC !important;
        }
        .custom-datepicker .react-datepicker__day--selected {
          background-color: #EF565D !important;
          color: white !important;
        }
        .custom-datepicker .react-datepicker__current-month,
        .custom-datepicker .react-datepicker__day-name {
          color: #53ACEC !important;
        }
        .custom-datepicker .react-datepicker__navigation {
          filter: invert(1);
        }
        .custom-popper {
          z-index: 9999 !important;
        }
      `}</style>
    </div>
  );
};

export default DateField;
