import { useState } from "react";
import { motion } from "motion/react";

function ComplexityComparison() {
  const [inputSize, setInputSize] = useState(5);

  const linearOperations = inputSize;
  const quadraticOperations = inputSize * inputSize;

  function handleInputSizeChange(event) {
    setInputSize(Number(event.target.value));
  }

  return (
    <section className="complexity-comparison">
      <div className="complexity-comparison__content">
        <p className="section-label">Comparing Growth</p>

        <h2>How does the amount of work change?</h2>

        <p className="complexity-comparison__description">
          Move the slider to compare constant, linear, and quadratic growth.
        </p>

        <div className="comparison-control">
          <label htmlFor="comparison-input">
            Input size: <strong>n = {inputSize}</strong>
          </label>

          <input
            id="comparison-input"
            type="range"
            min="1"
            max="10"
            value={inputSize}
            onChange={handleInputSizeChange}
          />
        </div>

        <div className="comparison-grid">
          <article className="complexity-card">
            <p className="complexity-card__notation">O(1)</p>

            <h3>Constant Time</h3>

            <p>
              The algorithm performs approximately the same amount of work,
              regardless of the input size.
            </p>

            <div className="operation-display">
              <span>Input items</span>
              <strong>{inputSize}</strong>
            </div>

            <div className="operation-display">
              <span>Operations</span>
              <strong>1</strong>
            </div>

            <div className="operation-visual" aria-hidden="true">
              <motion.span
                className="operation-block operation-block--active"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>

            <p className="complexity-card__example">
              Example: Accessing an array item using its index.
            </p>
          </article>

          <article className="complexity-card">
            <p className="complexity-card__notation">O(n)</p>

            <h3>Linear Time</h3>

            <p>
              The algorithm may perform one operation for every item it
              receives.
            </p>

            <div className="operation-display">
              <span>Input items</span>
              <strong>{inputSize}</strong>
            </div>

            <div className="operation-display">
              <span>Operations</span>
              <strong>{linearOperations}</strong>
            </div>

            <div className="operation-visual" aria-hidden="true">
              {Array.from({ length: linearOperations }, (_, index) => (
                <motion.span
                  className="operation-block operation-block--active"
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>

            <p className="complexity-card__example">
              Example: Searching every item in an unsorted list.
            </p>
          </article>

          <article className="complexity-card">
            <p className="complexity-card__notation">O(n²)</p>

            <h3>Quadratic Time</h3>

            <p>
              The algorithm may compare every item with every other item.
            </p>

            <div className="operation-display">
              <span>Input items</span>
              <strong>{inputSize}</strong>
            </div>

            <div className="operation-display">
              <span>Operations</span>
              <strong>{quadraticOperations}</strong>
            </div>

            <div className="operation-visual" aria-hidden="true">
              {Array.from({ length: quadraticOperations }, (_, index) => (
                <motion.span
                  className="operation-block operation-block--quadratic"
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.005,
                  }}
                />
              ))}
            </div>

            <p className="complexity-card__example">
              Example: Comparing every car at a meet with every other car.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ComplexityComparison;