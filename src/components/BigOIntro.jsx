import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import MotionSlider from "./MotionSlider";

const carParts = [
  "Car Wheel",
  "Brake Rotor",
  "Turbocharger",
  "Coilover",
  "Intercooler",
  "Exhaust",
  "Radiator",
  "Air Filter",
];

function BigOIntro() {
  const [itemCount, setItemCount] = useState(4);

  const visibleParts = carParts.slice(0, itemCount);

  function handleItemCountChange(event) {
    setItemCount(Number(event.target.value));
  }

  return (
    <AnimatedSection className="big-o-intro" id="big-o-intro">
      <div className="big-o-intro__content">
        <p className="section-label">Understanding Big O</p>

        <h2>What does n represent?</h2>

        <p className="big-o-intro__definition">
          In Big O notation, <strong>n</strong> represents the number of items
          an algorithm needs to process.
        </p>

        <div className="input-example">
          <div className="input-control">
            <label htmlFor="item-count">
              Number of items: <strong>{itemCount}</strong>
            </label>

            <MotionSlider
              id="item-count"
              min="1"
              max={carParts.length}
              value={itemCount}
              onChange={handleItemCountChange}
              ariaLabel="Number of items"
            />
          </div>

          <div className="input-example__items" aria-live="polite">
            <AnimatePresence>
              {visibleParts.map((part) => (
                <motion.span
                  key={part}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: -8,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.22,
                  }}
                >
                  {part}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <p>
            The algorithm currently receives{" "}
            <strong>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </strong>
            . Therefore, <strong>n = {itemCount}</strong>.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default BigOIntro;
