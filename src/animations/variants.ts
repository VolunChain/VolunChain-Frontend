import { Variants } from "framer-motion";

// Slower default transition for better visibility
export const defaultTransition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1]
};

// Slower fade up with more distance
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50  // Increased from 30 for more visible movement
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.2,  // Increased duration
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Adjusted stagger with longer delays
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,  // Increased from 0.2
      delayChildren: 0.4    // Increased from 0.3
    }
  }
};

// Slower list item reveal
export const listItemReveal: Variants = {
  hidden: { opacity: 0, x: -30 },  // Increased distance
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,  // Increased delay between items
      duration: 1.2,   // Increased duration
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

// Slower scroll reveal
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50  // Increased from 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,  // Increased duration
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Stats card animation
export const statsReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};
export const scaleUp: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition
  }
};

