"use client";

import { Github, Send } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, stayCenter, scrollReveal, fadeInUp } from "@/animations/variants";
import { useTranslation } from "react-i18next";

function XLogo() {
  return (
    <svg
      viewBox="0 0 124 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="X (Twitter) logo"
    >
      <path
        d="M97.3806 0.887207H116.111L75.201 48.1546L123.503 112.251H85.551L55.977 73.3967L21.9679 112.251H3.23771L47.1048 61.7646L0.77417 0.887207H39.7123L66.5748 36.5225L97.3806 0.887207ZM90.7259 100.866H101.076L34.0435 11.5274H22.7077L90.7259 100.866Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SocialMediaSection() {
  const { t } = useTranslation();

  const platforms = [
    {
      icon: XLogo,
      name: "Twitter",
      description: t('social.platforms.twitterDescription'),
      href: "https://x.com/volunchain",
      iconClassName: "text-sky-400",
    },
    {
      icon: Send,
      name: "Telegram",
      description: t('social.platforms.telegramDescription'),
      href: "https://t.me/volunchain",
      iconClassName: "text-red-400",
    },
    {
      icon: Github,
      name: "GitHub",
      description: t('social.platforms.githubDescription'),
      href: "https://github.com/VolunChain",
      iconClassName: "text-sky-400",
    },
  ];

  return (
    <motion.section id="social-media"
      className="bg-[#0C0B1E] py-24 mt-[4rem]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={scrollReveal}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-4"
          variants={fadeInUp}
        >
          <motion.span
            className="text-sky-400 text-lg font-medium"
            variants={fadeInUp}
          >
            {t('social.label')}
          </motion.span>
          <motion.h2
            className="text-white text-4xl md:text-5xl font-bold tracking-tighter"
            variants={fadeInUp}
          >
            {t('social.title')}
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed"
            variants={fadeInUp}
          >
            {t('social.description')}
          </motion.p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              custom={index}
              variants={
                index === 0
                  ? fadeInLeft(3.5) 
                  : index === platforms.length - 1
                  ? fadeInRight(3.5) 
                  : stayCenter
              }
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex"
            >
              <a
                target="_blank"
                href={platform.href}
                className="flex-1 rounded-lg p-8 bg-[#0F112B] border border-[#1E1D4C] transition-transform duration-200"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className={`${platform.iconClassName} border-2 border-current rounded-lg p-3`}>
                    <div className="w-12 h-12">
                      <platform.icon
                        className="w-full h-full"
                        strokeWidth={platform.icon === Send ? 1.5 : 2}
                      />
                    </div>
                  </div>
                  <h3 className="text-white text-2xl font-semibold">
                    {platform.name}
                  </h3>
                  <p className="text-gray-100">
                    {platform.description}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
