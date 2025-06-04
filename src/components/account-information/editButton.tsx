import { Pencil, Check } from "lucide-react";

interface EditButtonProps {
  isEditing: boolean;
  onClick: () => void;
}

const EditButton = ({ isEditing, onClick }: EditButtonProps) => {
  return (
    <button
      className="flex items-center text-gray-400 hover:dark:text-white transition"
      onClick={onClick}
    >
      {isEditing ? (
        <Check size={16} className="mr-1" />
      ) : (
        <Pencil size={16} className="mr-1" />
      )}
      <span className="text-sm">{isEditing ? "Save" : "Edit"}</span>
    </button>
  );
};

export default EditButton;
