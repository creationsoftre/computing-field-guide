import { motion } from "motion/react";

function MotionSlider({ id, min, max, value, onChange, ariaLabel }) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <motion.div
      className="motion-slider"
      whileHover={{ scaleY: 1.08 }}
      whileFocusWithin={{ scaleY: 1.08 }}
      whileTap={{ scaleY: 1.14 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    >
      <div className="motion-slider__track" aria-hidden="true">
        <motion.div
          className="motion-slider__fill"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />

        <motion.div
          className="motion-slider__thumb"
          animate={{ left: `${progress}%` }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      </div>

      <input
        id={id}
        className="motion-slider__input"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </motion.div>
  );
}

export default MotionSlider;
