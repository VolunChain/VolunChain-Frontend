import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFieldProps {
  name: string;
  value: Date;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
}

const DateField = ({
  name,
  value,
  onChange,
  disabled = false,
}: DateFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="w-full p-2 border rounded-lg bg-[#0F112B] dark:text-white transition-all duration-200 border-[#53ACEC]">
        <DatePicker
          selected={value}
          onChange={(date) => date && onChange(date)}
          className="w-full bg-transparent outline-none border-none dark:text-white"
          calendarClassName="custom-datepicker"
          dateFormat="MM/dd/yyyy"
          popperClassName="custom-popper"
          disabled={disabled}
        />
      </div>

      <style jsx global>{`
        .custom-datepicker {
          background-color: #0f172a !important;
          border: 1px solid #53acec !important;
          color: white !important;
        }
        .custom-datepicker .react-datepicker__header {
          background-color: #16213e !important;
          border-bottom: 1px solid #53acec !important;
        }
        .custom-datepicker .react-datepicker__day {
          color: white !important;
        }
        .custom-datepicker .react-datepicker__day:hover {
          background-color: #1e293b !important;
          color: #53acec !important;
        }
        .custom-datepicker .react-datepicker__day--selected {
          background-color: #ef565d !important;
          color: white !important;
        }
        .custom-datepicker .react-datepicker__current-month,
        .custom-datepicker .react-datepicker__day-name {
          color: #53acec !important;
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
