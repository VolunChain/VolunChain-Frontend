import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode | string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "tertiary" | "outline";
  type?: "button" | "submit" | "reset";
  textColor?: "white" | "black" | "primary" | "secondary" | "blue";
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  variant,
  textColor = "white",
  type = "button",
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "cursor-pointer py-3 px-6 rounded-full w-auto font-semibold border-2",
        className,
        {
          "dark:text-white": textColor === "white",
          "text-black": textColor === "black",
          "text-primary": textColor === "primary",
          "text-secondary": textColor === "secondary",
          "text-blue-500": textColor === "blue",

          "bg-primary ": variant === "primary",
          "border-primary": variant === "primary",
          "border-2 border-secondary": variant === "secondary",
          "border-2 border-link bg-link": variant === "tertiary",
          "w-full flex items-center justify-center gap-6 bg-transparent border border-[#73b9eb] hover:bg-[#73b9eb]/10 transition-colors":
            variant === "outline",
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
