import { motion } from "motion/react";

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function Hero() {
  return (
    <section className="hero" id="overview">
      <div className="hero__grid" aria-hidden="true" />

      <motion.div
        className="hero__content"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="hero__eyebrow"
          variants={heroItem}
        >
          <span aria-hidden="true" />
          Big O Complexity
        </motion.p>

        <motion.h1 variants={heroItem}>
          What happens when
          <span>
            10 items become <strong>10,000?</strong>
          </span>
        </motion.h1>

        <motion.p
          className="hero__description"
          variants={heroItem}
        >
          Big O describes how an algorithm&apos;s work grows as the
          amount of data increases.
        </motion.p>

        <motion.div variants={heroItem}>
          <motion.a
            className="hero__button"
            href="#big-o-intro"
            whileTap={{
              scale: 0.97,
            }}
            data-gsap-button
          >
            Start Learning
            <span aria-hidden="true">↓</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        className="hero__scroll-indicator"
        href="#big-o-intro"
        aria-label="Scroll to the Big O introduction"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
      >
        <span>Scroll</span>

        <motion.i
          animate={{
            y: [0, 7, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.a>
    </section>
  );
}

export default Hero;
