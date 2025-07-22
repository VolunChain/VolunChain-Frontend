import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "bg-[#0F112B] rounded-xl p-6", 
      className
    )}>
      {children}
    </div>
  )
}
