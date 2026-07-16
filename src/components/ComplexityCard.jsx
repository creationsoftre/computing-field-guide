import { motion } from "motion/react";

function ComplexityCard({
  notation,
  name,
  rating,
  definition,
  example,
  index,
}) {
  return (
    <motion.article
      className="complexity-info-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      <div className="complexity-info-card__header">
        <p className="complexity-info-card__notation">{notation}</p>
        <span>{rating}</span>
      </div>

      <h3>{name}</h3>

      <p className="complexity-info-card__definition">{definition}</p>

      <p className="complexity-info-card__example">
        <strong>Example:</strong> {example}
      </p>
    </motion.article>
  );
}

export default ComplexityCard;