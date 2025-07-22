import Link from "next/link"

interface CardHeaderProps {
  title: string
  action?: {
    label: string
    href?: string
  }
}

export default function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h3 className="text-md font-medium">{title}</h3>
      {action && (
        <Link 
          href={action.href || '#'} 
          className="text-sm text-[#2D9CDB] hover:text-[#2D9CDB]/90 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
} 