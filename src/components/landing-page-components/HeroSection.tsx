import Image from "next/image";
import Button from "../ui/Button";
import LandingNavbar from "./LandingNavbar";
import { motion } from "framer-motion";
import {fadeInUp, staggerContainer, scaleUp } from "../../animations/variants";

function HeroSection() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <LandingNavbar />
      
      <motion.div 
        className="w-full flex justify-center py-4 px-4 md:px-8 mt-[-20px]"
        variants={fadeInUp}
      >
        <Button
          variant="secondary"
          textColor="secondary"
          className="mb-4 flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-background-primary hover:border-secondary/50 transition-colors text-sm sm:text-base"
        >
          <motion.span 
            className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-secondary text-tertiary whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            New
          </motion.span>
          <span className="text-white hidden sm:inline">
            Take a Look to the Latest
          </span>
          <span className="text-white sm:hidden">Latest</span>
          <span className="text-secondary whitespace-nowrap">
            Volunteers Opportunities
          </span>
        </Button>
      </motion.div>

      <motion.main 
        className="flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8"
        variants={staggerContainer}
      >
        <div className="w-full max-w-[1076px] mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-white leading-tight max-w-[800px] mx-auto"
            variants={fadeInUp}
          >
            VolunChain: Transforming Volunteering, One Block at a Time
          </motion.h2>
          <motion.p 
            className="text-lg text-text-muted mb-6 text-white max-w-[650px] mx-auto"
            variants={fadeInUp}
          >
            Organizations post volunteer opportunities, and users join projects
            they love. Earn unique NFTs as proof of your impact!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" textColor="secondary" className="text-tertiary">
                I'm a Foundation
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="secondary" textColor="secondary" className="!bg-background">
                Start as Volunteer
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      <motion.div 
        className="w-full relative mt-[30px]"
        variants={scaleUp}
      >
        <div className="absolute left-0 right-0 h-full bg-gradient-to-b from-transparent from-0% via-[#070B1F40] via-50% to-[#070B1F] to-90% z-10" />
        <div className="flex justify-center max-w-screen-lg mx-auto">
          <Image
            src="/assets/landing.png"
            alt="Volunteers illustration"
            width={1426}
            height={1011}
            className="relative z-0 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[1426px]"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HeroSection;