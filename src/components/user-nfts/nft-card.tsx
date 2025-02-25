import Image from "next/image"

interface NFTCardProps {
  image: string
  companyName: string
  title: string
  description: string
  category: string
}

export function NFTCard({ image, companyName, title, description, category }: NFTCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-[#07081f] transition-transform hover:-translate-y-1">
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07081f]/80" />
      </div>
      <div className="p-6">
        <p className="mb-2 text-[#73B9EB]">{companyName}</p>
        <h3 className="mb-3 text-2xl font-semibold text-white">{title}</h3>
        <p className="mb-6 text-base text-[#9d9d9d]">{description}</p>
        <div className="inline-block rounded-full bg-[#73b9eb] px-6 py-2 text-base font-medium text-[#0f112b]">
          {category}
        </div>
      </div>
    </div>
  )
}

