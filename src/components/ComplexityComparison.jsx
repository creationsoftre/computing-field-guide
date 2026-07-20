import { useState } from "react";
import { motion } from "motion/react";
import AnimatedSection from "./AnimatedSection";
import MotionSlider from "./MotionSlider";

const factorial = (number) => {
  let result = 1;
  for (let value = 2; value <= number; value += 1) result *= value;
  return result;
};

const growthRates = [
  {
    notation: "O(1)",
    name: "Constant Time",
    description: "The amount of work stays the same regardless of input size.",
    example: "Accessing an array item using its index.",
    operations: () => 1,
  },
  {
    notation: "O(log n)",
    name: "Logarithmic Time",
    description: "Each operation eliminates a large portion of the remaining input.",
    example: "Binary search in a sorted list.",
    operations: (n) => Math.ceil(Math.log2(n + 1)),
  },
  {
    notation: "O(n)",
    name: "Linear Time",
    description: "The work grows at approximately the same rate as the input.",
    example: "Searching every item in an unsorted list.",
    operations: (n) => n,
  },
  {
    notation: "O(n log n)",
    name: "Linearithmic Time",
    description: "Every item is processed across repeatedly divided groups.",
    example: "Sorting values with merge sort.",
    operations: (n) => Math.ceil(n * Math.log2(n + 1)),
  },
  {
    notation: "O(n²)",
    name: "Polynomial: Quadratic Time",
    description: "The algorithm may perform work for every pair of input items.",
    example: "Two nested loops comparing every item.",
    operations: (n) => n ** 2,
  },
  {
    notation: "O(n³)",
    name: "Polynomial: Cubic Time",
    description: "Three nested dimensions of work grow with the input.",
    example: "A basic algorithm multiplying two n × n matrices.",
    operations: (n) => n ** 3,
  },
  {
    notation: "O(2ⁿ)",
    name: "Exponential Time",
    description: "The amount of work doubles whenever one input item is added.",
    example: "Testing every possible subset of a collection.",
    operations: (n) => 2 ** n,
  },
  {
    notation: "O(n!)",
    name: "Factorial Time",
    description: "The algorithm examines every possible ordering of the input.",
    example: "Brute-forcing every possible route between destinations.",
    operations: factorial,
  },
];

const formatOperations = (operations) => new Intl.NumberFormat("en-US").format(operations);

function ComplexityComparison() {
  const [inputSize, setInputSize] = useState(5);

  return (
    <AnimatedSection className="complexity-comparison">
      <div className="complexity-comparison__content">
        <p className="section-label">Comparing Growth</p>
        <h2>How does the amount of work change?</h2>
        <p className="complexity-comparison__description">
          Move the slider to compare the most common Big O growth rates. Polynomial
          time includes quadratic, cubic, and other fixed powers of n.
        </p>

        <div className="comparison-control">
          <label htmlFor="comparison-input">
            Input size: <strong>n = {inputSize}</strong>
          </label>
          <MotionSlider
            id="comparison-input"
            min="1"
            max="10"
            value={inputSize}
            onChange={(event) => setInputSize(Number(event.target.value))}
            ariaLabel="Comparison input size"
          />
        </div>

        <div className="comparison-grid">
          {growthRates.map((growthRate) => {
            const operationCount = growthRate.operations(inputSize);
            const visibleBlocks = Math.min(operationCount, 100);

            return (
              <motion.article className="complexity-card" data-gsap-card key={growthRate.notation}>
                <p className="complexity-card__notation">{growthRate.notation}</p>
                <h3>{growthRate.name}</h3>
                <p>{growthRate.description}</p>

                <div className="operation-display">
                  <span>Input items</span>
                  <strong>{inputSize}</strong>
                </div>
                <div className="operation-display">
                  <span>Operations</span>
                  <strong>{formatOperations(operationCount)}</strong>
                </div>

                <div className="operation-visual" aria-hidden="true">
                  {Array.from({ length: visibleBlocks }, (_, index) => (
                    <motion.span
                      className={`operation-block ${index < 25 ? "operation-block--active" : "operation-block--quadratic"}`}
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.003, 0.2) }}
                    />
                  ))}
                  {operationCount > visibleBlocks && (
                    <span className="operation-visual__overflow">+{formatOperations(operationCount - visibleBlocks)}</span>
                  )}
                </div>

                <p className="complexity-card__example">Example: {growthRate.example}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default ComplexityComparison;
