import Image from "next/image";
import Link from "next/link";

interface EntityAction {
  type: 'link' | 'image'
  href?: string
  image?: string
  label?: string
}

export interface EntityItemProps {
  image: string
  title: string
  subtitle: string
  action?: EntityAction
  meta?: string
}

export default function EntityItem({ item }: { item: EntityItemProps }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={item.image}
          alt={item.title}
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[0.9375rem]">{item.title}</p>
        <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
        {item.meta && (
          <p className="text-xs text-gray-400 mt-0.5">{item.meta}</p>
        )}
      </div>
      {item.action && (
        item.action.type === 'image' ? (
          <div className="h-10 w-10">
            <Image
              src={item.action.image!}
              alt=""
              width={40}
              height={40}
              className="rounded-lg"
            />
          </div>
        ) : (
          <Link 
            href={item.action.href || '#'} 
            className="text-[#2D9CDB] text-sm hover:underline"
          >
            {item.action.label || 'Check Out'}
          </Link>
        )
      )}
    </div>
  )
}
