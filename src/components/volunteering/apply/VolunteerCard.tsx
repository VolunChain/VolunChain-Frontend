"use client";

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

                <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.30545 19.7031L16.3156 29.1067C16.6401 29.4114 16.8023 29.5638 17.0003 29.5638C17.1983 29.5638 17.3606 29.4114 17.685 29.1067L17.685 29.1067L27.6952 19.7031C30.4664 17.0998 30.803 12.8159 28.4722 9.81177L28.034 9.2469C25.2457 5.65316 19.649 6.25586 17.6898 10.3608C17.413 10.9407 16.5876 10.9407 16.3109 10.3608C14.3517 6.25586 8.75494 5.65315 5.96668 9.2469L5.52843 9.81177C3.19767 12.8159 3.5342 17.0998 6.30545 19.7031Z" fill="#EF565D" stroke="#EF565D" strokeWidth="2" />
                        </svg>
                        <span className="text-sm sm:text-[24px] text-[#94A3B8]">{likes} Likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.0003 9.1665C11.2335 9.1665 5.62847 18.1995 4.1025 21.1087C3.89035 21.5131 3.78427 21.7154 3.79702 21.9865C3.80977 22.2576 3.93732 22.4535 4.1924 22.8454C6.05365 25.7044 12.7229 34.8332 22.0003 34.8332C31.2778 34.8332 37.947 25.7044 39.8083 22.8454C40.0633 22.4535 40.1909 22.2576 40.2036 21.9865C40.2164 21.7154 40.1103 21.5131 39.8982 21.1087C38.3722 18.1995 32.7671 9.1665 22.0003 9.1665Z" stroke="#898A97" strokeWidth="2" />
                            <circle cx="22.0003" cy="21.9998" r="7.33333" fill="#898A97" />
                        </svg>
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