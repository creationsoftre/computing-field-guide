import { useState } from "react";

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
    <section className="big-o-intro" id="big-o-intro">
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

            <input
              id="item-count"
              type="range"
              min="1"
              max={carParts.length}
              value={itemCount}
              onChange={handleItemCountChange}
            />
          </div>

          <div className="input-example__items" aria-live="polite">
            {visibleParts.map((part) => (
              <span key={part}>{part}</span>
            ))}
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
    </section>
  );
}

export default BigOIntro;