import { Github, Send } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function XLogo() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const scrollReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function SocialMediaSection() {
  const platforms = [
    {
      icon: XLogo,
      name: "Twitter",
      description: "News and Updates",
      href: "#",
      iconClassName: "text-sky-400"
    },
    {
      icon: Send,
      name: "Telegram",
      description: "Discussions",
      href: "#",
      iconClassName: "text-red-400"
    },
    {
      icon: Github,
      name: "GitHub",
      description: "Resources",
      href: "#",
      iconClassName: "text-sky-400"
    }
  ];

  return (
    <motion.section
      className="bg-[#0C0B1E] py-24"
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
            Social Media
          </motion.span>
          <motion.h2
            className="text-white text-4xl md:text-5xl font-bold tracking-tighter"
            variants={fadeInUp}
          >
            Join The Chain
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed"
            variants={fadeInUp}
          >
           Connect with us on social media and contribute to building a better ecosystem for volunteering. 
           Stay updated, share your thoughts, and collaborate with our growing community!
          </motion.p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              custom={index}
              variants={staggerContainer}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex"
            >
              <Link
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}