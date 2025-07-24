import { cn } from "@/shared/utils/utils";

export default function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-content"
        className={cn("px-6", className)}
        {...props}
      />
    )
  }