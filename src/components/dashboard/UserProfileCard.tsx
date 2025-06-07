"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
interface ProfileCardProps {
  name?: string;
  username?: string;
  hoursSpent?: number;
  volunteering?: number;
  nfts?: number;
  profileImage?: string;
  bannerImage?: string;
}

export default function UserProfileCard({
  name = "Account Name",
  username = "@Secondary Name",
  hoursSpent = 345,
  volunteering = 12,
  nfts = 34,
  profileImage = "/placeholders/profile-image.png",
  bannerImage = "/placeholders/cover-image.png",
}: ProfileCardProps) {
  return (
    <Card className="w-full overflow-hidden  dark:text-white">
      <div className="relative h-[140px] ">
        <Image
          src={bannerImage}
          alt="Profile banner"
          fill
          className="object-cover rounded-xl"
          priority
        />

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="h-24 w-24 rounded-full border-4 border-[#0a0b1e] overflow-hidden">
            <Image
              src={profileImage}
              alt={`${name}'s profile picture`}
              width={96}
              height={96}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-[0.875rem] text-gray-400">{username}</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 px-4 py-2">
        <div className="text-center">
          <p className="text-lg font-bold">{hoursSpent}h</p>
          <p className="text-[0.7875rem] text-gray-400">Hours Spent</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{volunteering}</p>
          <p className="text-[0.7875rem] text-gray-400">
            Attended Volunteering
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{nfts}</p>
          <p className="text-[0.7875rem] text-gray-400">NFTs</p>
        </div>
      </div>

      <div className="p-4">
        <Button variant="tertiary" className="w-full">
          See Profile
        </Button>
      </div>
    </Card>
  );
}
