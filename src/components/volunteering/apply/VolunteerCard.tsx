"use client";

import { EyeIcon, HeartIcon } from "lucide-react";
import Image from "next/image";

interface VolunteerCardProps {
    title: string;
    subTitle: string;
    description: string;
    about: string;
    views: number;
    likes: number;
    tags: string[];
    image: string;
    logo: string;
}

export function VolunteerCard({
    title,
    subTitle,
    description,
    about,
    views,
    likes,
    tags,
    image,
    logo
}: VolunteerCardProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full rounded-2xl overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={714}
                    height={711}
                    className="w-full h-auto object-cover"
                    priority
                />
            </div>

            <div className="bg-[#0F112A] p-4 sm:p-6 md:p-12 w-full rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                    <Image
                        src={logo}
                        alt="ArkSpace Logo"
                        width={80}
                        height={80}
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-[80px] md:h-[80px] rounded-2xl"
                    />
                    <div className="flex flex-col gap-2 flex-1">
                        <h2 className="text-xl sm:text-[32px] font-semibold text-white">{title}</h2>
                        <p className="text-sm sm:text-[24px] text-[#94A3B8]">{subTitle}</p>
                    </div>
                </div>

                <div className="flex justify-start items-center gap-14 sm:gap-14 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                        <HeartIcon fill="#EF565D" className="w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8" color="#EF565D" />
                        <span className="text-sm sm:text-[24px] text-[#94A3B8]">{likes} Likes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <EyeIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" color="#898A97" />
                        <span className="text-sm sm:text-[24px] text-[#94A3B8]">{views} Views</span>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-12">
                    <div>
                        <h3 className="text-base sm:text-[24px] font-medium text-white mb-2">Description</h3>
                        <p className="text-sm sm:text-[18px] text-[#94A3B8] leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base sm:text-[24px] font-medium text-white mb-2">About</h3>
                        <p className="text-sm sm:text-[18px] text-[#94A3B8] leading-relaxed">
                            {about}
                        </p>
                    </div>
                </div>

                <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-[24px] font-medium text-white mb-2 sm:mb-6">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-2 sm:px-4 sm:py-3 text-[16px] rounded-full bg-secondary text-tertiary whitespace-nowrap"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 