function Hero() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">Big O Complexity</p>

      <h1>
        What happens when
        <span> 10 items become 10,000?</span>
      </h1>

      <p className="hero__description">
        Big O describes how an algorithm&apos;s work grows as the amount of
        data increases.
      </p>

      <button type="button">Start Learning</button>
    </section>
  );
}

export default Hero;