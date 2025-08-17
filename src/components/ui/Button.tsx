import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode | string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
  textColor?: "white" | "black" | "primary" | "secondary";
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  textColor = "white",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx("group cursor-pointer py-3 px-6 rounded-full w-full font-semibold border-2 transform hover:scale-105 transition-all duration-200 hover:shadow-lg", {
        
        "text-white": textColor === "white",
        "text-black": textColor === "black",
        "text-primary": textColor === "primary",
        "text-secondary": textColor === "secondary",

        "bg-primary ":
          variant === "primary",
        "border-primary": variant === "primary",
        "border-2 border-secondary":
          variant === "secondary",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
