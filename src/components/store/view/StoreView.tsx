"use client";

import Button from "@/components/ui/Button";
import { Heart, MessageCircle, Plus } from "lucide-react";
import postOne from "@/../public/assets/dashboard/post-2.png";
import profileImage from "@/../public/assets/dashboard/nft.png";
import Image from "next/image";

export default function StoreView() {
  const storeData = [
    {
      id: 1,
      profileImage: profileImage,
      profileName: "Dog Goods for Good Dogs",
      profileUserName: "@dogs_goods",
      postTitle: "Join us this week for a great experience with the doggos!",
      postDescription:
        "We will be giving food to them and raising money for the cause this weekend",
      postImage: postOne,
      likes: "23.1k",
      tags: ["Social Services", "Animal Welfare"],
    },
    {
      id: 2,
      profileImage: profileImage,
      profileName: "Dog Goods for Good Dogs",
      profileUserName: "@dogs_goods",
      postTitle: "New NFT out for our volunteers!",
      postDescription: "Rewards all month and every day you participate.",
      postImage: postOne,
      likes: "23.1k",
      tags: ["Volunteers", "NFT"],
    },
  ];
  return (
    <div className="min-h-screen bg-[#0F112B] p-8">
      <div className="max-w-[1440px] mx-auto overflow-x-auto">
        {storeData.map((data) => (
          <div key={data.id}>
            <div className="flex items-center gap-6 my-10">
              <Image
                src={data.profileImage}
                alt=""
                className="w-[80px] h-[80px] rounded-[58px]"
              />
              <div>
                <p className="text-[22px] font-[700] text-[#73b9eb}">
                  {data.profileName}
                </p>
                <p className="text-[14px] font-[300] text-[#a8a8a8]">
                  {data.profileUserName}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[22px] font-[600]">{data.postTitle}</p>
              <p className="text-[18px] font-[400] text-[#9d9d9d] mb-2">
                {data.postDescription}
              </p>
              <Image src={data.postImage} alt="" />
            </div>

            <div className="flex flex-col md:items-center justify-between pt-6 md:flex-row">
              <div className="flex flex-col md:items-center gap-6 md:flex-row">
                <div className="flex items-center justify-between gap-6">
                  <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
                    <Heart className="w-6 h-6 fill-current" />
                    <span>{data.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#53ACEC] hover:text-[#53ACEC]/80 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                    <span>Comments</span>
                  </button>
                </div>

                <div className="flex flex-col md:items-center gap-2 md:flex-row">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[#0f112b] text-center text-sm font-[600] py-[10px] px-[30px] rounded-[48px] bg-[#53ACEC] hover:bg-[#3a8ec9] whitespace-nowrap "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="text-[#53ACEC] border-[#53ACEC] hover:bg-[#53ACEC]/10 rounded-[46px] border-2 text-sm mt-3 md:mt-0"
                >
                  <Plus />
                  Follow
                </Button>
              </div>
            </div>
          </div>
        ))}
        {/*  */}
      </div>
    </div>
  );
}
