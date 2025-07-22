import { Variants } from "framer-motion";


export const defaultTransition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1]
};


export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50  
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.2,  
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4   
    }
  }
};

export const listItemReveal: Variants = {
  hidden: { opacity: 0, x: -30 }, 
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,  
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50  
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

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

export const fadeInLeft = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    x: -150,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.3,
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const fadeInRight = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    x: 150,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.3,
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const stayCenter = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
