function BigOIntro() {
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
          <div className="input-example__items" aria-hidden="true">
            <span>Car Wheel</span>
            <span>Brake Rotor</span>
            <span>Turbocharger</span>
            <span>Coilover</span>
          </div>

          <p>
            In this example, the algorithm receives four car parts.
            Therefore, <strong>n = 4</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BigOIntro;