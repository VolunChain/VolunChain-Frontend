import type React from "react"
import { NFTCard } from "@/components/user-nfts/nft-card"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#07081f]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 border-r border-[#181934]">
          {/* <SidebarFilters /> */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <NFTCard
                key={i}
                image="/images/nft-user-1.jpeg"
                companyName="Company Name"
                title="Lorem Ipsum is simply dummy"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                category="Animal Welfare"
              />
            ))}
          </div>

          {/*  Pagination */}
          {/* <PaginationWrapper /> */}
        </main>
      </div>

    </div>
  )
}