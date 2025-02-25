import type React from "react"
import { NFTCard } from "@/components/user-nfts/nft-card"

const mockData = [
  {
    id: 1,
    image: "/images/nft-user-1.jpeg",
    companyName: "Company Name",
    title: "Lorem Ipsum is simply dummy",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Animal Welfare",
  },
  {
    id: 2,
    image: "/images/nft-user-2.jpeg",
    companyName: "Company Name",
    title: "Lorem Ipsum is simply dummy",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Animal Welfare",
  },
  {
    id: 3,
    image: "/images/nft-user-3.jpeg",
    companyName: "Company Name",
    title: "Lorem Ipsum is simply dummy",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Animal Welfare",
  },
  {
    id: 4,
    image: "/images/nft-user-1.jpeg",
    companyName: "Company Name",
    title: "Lorem Ipsum is simply dummy",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Animal Welfare",
  },
  {
    id: 5,
    image: "/images/nft-user-2.jpeg",
    companyName: "Company Name",
    title: "Lorem Ipsum is simply dummy",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Animal Welfare",
  },
  {
    id: 6,
    image: "/images/nft-user-3.jpeg",
    companyName: "Company Name",
    title: "Lorem Ipsum is simply dummy",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Animal Welfare", 

  }
]

export default function Page() {
  return (
    <div className="min-h-screen bg-[#07081f]">
      <div className="flex">


        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockData.map((nft, i) => (
              <NFTCard
                key={nft.id}
                image={nft.image}
                companyName={nft.companyName}
                title={nft.title}
                description={nft.description}
                category={nft.category}
              />
            ))}
          </div>

        </main>
      </div>

    </div>
  )
}