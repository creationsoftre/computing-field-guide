import { motion } from "motion/react";

function AnimatedSection({
  children,
  className = "",
  id,
}) {
  return (
    <motion.section
      className={className}
      id={id}
      initial={{
        opacity: 0,
        y: 30,
        filter: "blur(4px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {children}
    </motion.section>
  );
}

export default AnimatedSection;