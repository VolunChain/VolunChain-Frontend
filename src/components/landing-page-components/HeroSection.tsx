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
      className="min-h-screen bg-background"
    >
      <LandingNavbar />
      
      <motion.div 
        className="w-full flex justify-center py-6 px-4 md:px-8 -mt-5"
        variants={fadeInUp}
      >
        <Button
          variant="secondary"
          textColor="secondary"
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-background-primary hover:bg-background-primary/90 transition-all text-sm sm:text-base"
        >
          <motion.span 
            className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-secondary text-tertiary whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            New
          </motion.span>
          <span className="text-white hidden sm:inline">
            Take a Look to the Latest
          </span>
          <span className="text-white sm:hidden">Latest</span>
          <span className="text-secondary font-medium whitespace-nowrap">
            Volunteers Opportunities
          </span>
        </Button>
      </motion.div>

      <motion.main 
        className="flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8 mt-8 md:mt-12"
        variants={staggerContainer}
      >
        <div className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-snug lg:leading-normal max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            VolunChain: Transforming Volunteering, One Block at a Time
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Organizations post volunteer opportunities, and users join projects
            they love. Earn unique NFTs as proof of your impact!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            variants={fadeInUp}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button variant="primary" textColor="secondary" className="text-tertiary w-full">
                I'm a Foundation
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button variant="secondary" textColor="secondary" className="!bg-background w-full">
                Start as Volunteer
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      <motion.div 
        className="w-full relative mt-16 md:mt-20"
        variants={scaleUp}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
        <div className="flex justify-center max-w-7xl mx-auto px-4">
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