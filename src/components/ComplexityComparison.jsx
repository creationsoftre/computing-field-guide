import { useState } from "react";

function ComplexityComparison() {
  const [inputSize, setInputSize] = useState(5);

  function handleInputSizeChange(event) {
    setInputSize(Number(event.target.value));
  }

  return (
    <section className="complexity-comparison">
      <div className="complexity-comparison__content">
        <p className="section-label">Comparing Growth</p>

        <h2>How does the amount of work change?</h2>

        <p className="complexity-comparison__description">
          Move the slider to increase the number of items and compare constant
          time with linear time.
        </p>

        <div className="comparison-control">
          <label htmlFor="comparison-input">
            Input size: <strong>n = {inputSize}</strong>
          </label>

          <input
            id="comparison-input"
            type="range"
            min="1"
            max="20"
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
              <span className="operation-block operation-block--active" />
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
              <strong>{inputSize}</strong>
            </div>

            <div className="operation-visual" aria-hidden="true">
              {Array.from({ length: inputSize }, (_, index) => (
                <span
                  className="operation-block operation-block--active"
                  key={index}
                />
              ))}
            </div>

            <p className="complexity-card__example">
              Example: Searching every item in an unsorted list.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ComplexityComparison;