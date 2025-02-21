import { Pencil } from "lucide-react";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button 
      className="flex items-center text-gray-400 hover:text-white transition"
      onClick={onClick}
    >
      <Pencil size={16} className="mr-1" />
      <span className="text-sm">Edit</span>
    </button>
  );
};

export default EditButton;
