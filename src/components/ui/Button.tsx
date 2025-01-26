import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode | string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  textColor?: "white" | "black" | "primary" | "secondary";
  className?: string 
}

const Button = ({
  children,
  onClick,
  variant,
  textColor = "white",
  type = "button",
  className
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx("cursor-pointer py-3 px-6 rounded-full w-auto font-semibold border-2", className, {
        
        "text-white": textColor === "white",
        "text-black": textColor === "black",
        "text-primary": textColor === "primary",
        "text-secondary": textColor === "secondary",

        "bg-primary ":
          variant === "primary",
        "border-primary": variant === "primary",
        "border-2 border-secondary":
          variant === "secondary",
        "w-full flex items-center justify-center gap-6 bg-transparent border border-[#73b9eb] hover:bg-[#73b9eb]/10 transition-colors": variant === "outline",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;