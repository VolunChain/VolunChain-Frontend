
import Button from "../ui/Button";

type Props = {};

const stats = [
  {
    value: "260",
    label: "Foundations",
  },
  {
    value: "960",
    label: "Users",
  },
  {
    value: "231",
    label: "Succesful Volunteers",
  },
  {
    value: "10k",
    label: "People Helped",
  },
];

const StartSection = (props: Props) => {
  return (
    <section className="text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-12">
            {/* Left content area */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6 lg:max-w-[50ch]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
                Our app connects foundations with volunteers, creating impactful
                opportunities for both.
              </h3>
              <p className="text-grey text-sm sm:text-base md:text-lg">
                We will help you to achieve the same as a company or volunteer!
              </p>
              <Button
                variant="primary"
                textColor="black"
                type="button"
                className="w-full sm:w-auto"
              >
                Let&apos;s get started
              </Button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full lg:w-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0F112B] rounded-lg p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-kantumruy font-semibold">
                    {stat.value}
                    <span className="text-blue">+</span>
                  </p>
                  <p className="text-xs sm:text-sm md:text-base font-kantumruy mt-2">
                    {stat.label}
                  </p>

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { fadeInUp, staggerContainer, scrollReveal } from "../../animations/variants";

interface Stat {
    value: string;
    label: string;
}

const stats: Stat[] = [
    { value: "260", label: "Foundations" },
    { value: "960", label: "Users" },
    { value: "231", label: "Successful Volunteers" },
    { value: "10k", label: "People Helped" },
];

const StartSection = () => {
    return (
        <motion.section 
            className="text-white flex justify-center items-center py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollReveal}
        >
            <div className="container mx-auto px-4 w-full md:px-6 lg:px-6">
                <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:flex lg:justify-between max-w-5xl lg:mx-auto gap-y-8 sm:gap-y-12">
                    <motion.div 
                        className="text-center lg:text-left flex flex-col items-center w-full lg:w-[50ch] gap-4 lg:gap-8 lg:items-start"
                        variants={fadeInUp}
                    >
                        <motion.h3 
                            className="text-[1.5em]"
                            variants={fadeInUp}
                        >
                            Our app connects foundations with volunteers,
                            creating impactful opportunities for both.
                        </motion.h3>
                        <motion.p 
                            className="text-grey"
                            variants={fadeInUp}
                        >
                            We will help you to achieve the same as a company or volunteer!
                        </motion.p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="primary" textColor="black" type="button">
                                Let&apos;s get started
                            </Button>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-2 mx-auto gap-4 xl:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={staggerContainer}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center bg-[#0F112B] p-6 py-12 sm:p-10 md:px-8 sm:py-16 rounded-lg"
                            >
                                <motion.p 
                                    className="text-[2em] font-kantumruy md:text-[2.5em] capitalize font-semibold"
                                    variants={fadeInUp}
                                >
                                    {stat.value}<span className="text-blue">+</span>
                                </motion.p>
                                <p className="text-sm font-kantumruy sm:text-base">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StartSection;

        </motion.section>
    );
};

export default StartSection;

