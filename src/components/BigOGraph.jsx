import { useState } from "react";
import { motion } from "motion/react";

const complexities = [
  {
    id: "constant",
    notation: "O(1)",
    name: "Constant",
    color: "#63e6be",
    calculate: () => 1,
  },
  {
    id: "logarithmic",
    notation: "O(log n)",
    name: "Logarithmic",
    color: "#74c0fc",
    calculate: (n) => Math.log2(n),
  },
  {
    id: "linear",
    notation: "O(n)",
    name: "Linear",
    color: "#91a7ff",
    calculate: (n) => n,
  },
  {
    id: "linearithmic",
    notation: "O(n log n)",
    name: "Linearithmic",
    color: "#b197fc",
    calculate: (n) => n * Math.log2(n),
  },
  {
    id: "quadratic",
    notation: "O(n²)",
    name: "Quadratic",
    color: "#ffd43b",
    calculate: (n) => n * n,
  },
  {
    id: "exponential",
    notation: "O(2ⁿ)",
    name: "Exponential",
    color: "#ff922b",
    calculate: (n) => 2 ** n,
  },
  {
    id: "factorial",
    notation: "O(n!)",
    name: "Factorial",
    color: "#ff6b6b",
    calculate: factorial,
  },
];

const chart = {
  width: 900,
  height: 500,
  paddingTop: 40,
  paddingRight: 40,
  paddingBottom: 70,
  paddingLeft: 75,
  maximumInput: 10,
  maximumOperations: 100,
};

function factorial(number) {
  let result = 1;

  for (let current = 2; current <= number; current += 1) {
    result *= current;
  }

  return result;
}

function getXPosition(inputSize) {
  const graphWidth =
    chart.width - chart.paddingLeft - chart.paddingRight;

  return (
    chart.paddingLeft +
    ((inputSize - 1) / (chart.maximumInput - 1)) * graphWidth
  );
}

function getYPosition(operationCount) {
  const graphHeight =
    chart.height - chart.paddingTop - chart.paddingBottom;

  const limitedOperations = Math.min(
    operationCount,
    chart.maximumOperations,
  );

  return (
    chart.height -
    chart.paddingBottom -
    (limitedOperations / chart.maximumOperations) * graphHeight
  );
}

function createPath(calculate) {
  const points = [];

  for (
    let inputSize = 1;
    inputSize <= chart.maximumInput;
    inputSize += 1
  ) {
    const x = getXPosition(inputSize);
    const y = getYPosition(calculate(inputSize));

    points.push(`${x},${y}`);
  }

  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";

      return `${command} ${point}`;
    })
    .join(" ");
}

function BigOGraph() {
  const [selectedComplexity, setSelectedComplexity] =
    useState("linear");

  const [inputSize, setInputSize] = useState(5);

  const selectedData = complexities.find(
    (complexity) => complexity.id === selectedComplexity,
  );

  const selectedOperations = selectedData.calculate(inputSize);

  function handleInputChange(event) {
    setInputSize(Number(event.target.value));
  }

  return (
    <section className="big-o-graph">
      <div className="big-o-graph__content">
        <p className="section-label">Visualizing Growth</p>

        <h2>How quickly does the work grow?</h2>

        <p className="big-o-graph__description">
          Each line represents how the number of operations changes as the
          input becomes larger. Select a complexity to examine it.
        </p>

        <div className="graph-layout">
          <div className="graph-panel">
            <svg
              className="graph"
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              role="img"
              aria-labelledby="graph-title graph-description"
            >
              <title id="graph-title">
                Big O complexity growth graph
              </title>

              <desc id="graph-description">
                A graph comparing seven common Big O growth rates from
                constant time through factorial time.
              </desc>

              <line
                className="graph__axis"
                x1={chart.paddingLeft}
                y1={chart.paddingTop}
                x2={chart.paddingLeft}
                y2={chart.height - chart.paddingBottom}
              />

              <line
                className="graph__axis"
                x1={chart.paddingLeft}
                y1={chart.height - chart.paddingBottom}
                x2={chart.width - chart.paddingRight}
                y2={chart.height - chart.paddingBottom}
              />

              {[0, 25, 50, 75, 100].map((operationCount) => {
                const y = getYPosition(operationCount);

                return (
                  <g key={operationCount}>
                    <line
                      className="graph__grid-line"
                      x1={chart.paddingLeft}
                      y1={y}
                      x2={chart.width - chart.paddingRight}
                      y2={y}
                    />

                    <text
                      className="graph__tick-label"
                      x={chart.paddingLeft - 15}
                      y={y + 5}
                      textAnchor="end"
                    >
                      {operationCount}
                    </text>
                  </g>
                );
              })}

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (currentInput) => {
                  const x = getXPosition(currentInput);

                  return (
                    <g key={currentInput}>
                      <line
                        className="graph__grid-line"
                        x1={x}
                        y1={chart.paddingTop}
                        x2={x}
                        y2={chart.height - chart.paddingBottom}
                      />

                      <text
                        className="graph__tick-label"
                        x={x}
                        y={chart.height - chart.paddingBottom + 28}
                        textAnchor="middle"
                      >
                        {currentInput}
                      </text>
                    </g>
                  );
                },
              )}

              <text
                className="graph__axis-label"
                x={chart.width / 2}
                y={chart.height - 15}
                textAnchor="middle"
              >
                Input size — n
              </text>

              <text
                className="graph__axis-label"
                x="20"
                y={chart.height / 2}
                textAnchor="middle"
                transform={`rotate(-90 20 ${chart.height / 2})`}
              >
                Approximate operations
              </text>

              {complexities.map((complexity, index) => {
                const isSelected =
                  complexity.id === selectedComplexity;

                return (
                  <motion.path
                    className="graph__curve"
                    d={createPath(complexity.calculate)}
                    key={complexity.id}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: 1,
                        delay: index * 0.12,
                      },
                      opacity: {
                        duration: 0.2,
                        delay: index * 0.12,
                      },
                    }}
                    viewport={{ once: true, amount: 0.4 }}
                    fill="none"
                    stroke={complexity.color}
                    strokeWidth={isSelected ? 6 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isSelected ? 1 : 0.35}
                    onMouseEnter={() =>
                      setSelectedComplexity(complexity.id)
                    }
                  />
                );
              })}

              <line
                className="graph__marker-line"
                x1={getXPosition(inputSize)}
                y1={chart.paddingTop}
                x2={getXPosition(inputSize)}
                y2={chart.height - chart.paddingBottom}
              />

              <motion.circle
                className="graph__marker"
                animate={{
                  cx: getXPosition(inputSize),
                  cy: getYPosition(selectedOperations),
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 25,
                }}
                r="8"
                fill={selectedData.color}
              />
            </svg>
          </div>

          <aside className="graph-details">
            <p className="graph-details__notation">
              {selectedData.notation}
            </p>

            <h3>{selectedData.name} Time</h3>

            <div className="graph-details__stat">
              <span>Input size</span>
              <strong>n = {inputSize}</strong>
            </div>

            <div className="graph-details__stat">
              <span>Approximate operations</span>
              <strong>
                {selectedOperations > chart.maximumOperations
                  ? `${selectedOperations.toLocaleString()}+`
                  : selectedOperations.toFixed(
                      Number.isInteger(selectedOperations) ? 0 : 1,
                    )}
              </strong>
            </div>

            {selectedOperations > chart.maximumOperations && (
              <p className="graph-details__notice">
                This value extends beyond the visible graph.
              </p>
            )}

            <label htmlFor="graph-input">
              Change the input size
            </label>

            <input
              id="graph-input"
              type="range"
              min="1"
              max={chart.maximumInput}
              value={inputSize}
              onChange={handleInputChange}
            />
          </aside>
        </div>

        <div
          className="graph-legend"
          aria-label="Select a Big O complexity"
        >
          {complexities.map((complexity) => {
            const isSelected =
              complexity.id === selectedComplexity;

            return (
              <button
                className={
                  isSelected
                    ? "graph-legend__button graph-legend__button--selected"
                    : "graph-legend__button"
                }
                type="button"
                key={complexity.id}
                onClick={() =>
                  setSelectedComplexity(complexity.id)
                }
                style={{
                  "--complexity-color": complexity.color,
                }}
              >
                <span aria-hidden="true" />
                {complexity.notation}
              </button>
            );
          })}
        </div>

        <p className="graph-note">
          The graph stops displaying values above 100 operations so the
          smaller growth rates remain visible. The actual values continue
          increasing beyond the top of the chart.
        </p>
      </div>
    </section>
  );
}

export default BigOGraph;