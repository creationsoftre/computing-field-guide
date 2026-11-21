import { motion } from "motion/react";

const topics = [
  {
    id: "dsa",
    number: "01",
    title: "Data Structures & Algorithms",
    description: "Build intuition for complexity, structures, searching, sorting, and implementation choices.",
    meta: "12 sections / Active guide",
    accent: "orange",
  },
  {
    id: "sdlc",
    number: "02",
    title: "Software Development Life Cycle",
    description: "Review Waterfall, Agile, Hybrid, quality assurance, Selenium testing, deployment, and the decisions behind each approach.",
    meta: "16 sections / Updated guide",
    accent: "blue",
  },
  {
    id: "architecture",
    number: "03",
    title: "Software Architecture & Design",
    description: "Understand OOP, design patterns, and domain-driven design through plain language and small interactive examples.",
    meta: "5 sections / New guide",
    accent: "green",
  },
  {
    id: "grc",
    number: "04",
    title: "Governance, Risk & Compliance",
    description: "Turn obligations, uncertainty, controls, recovery, and audit evidence into defensible decisions.",
    meta: "5 modules / Interactive labs",
    accent: "violet",
  },
  {
    id: "cloud",
    number: "05",
    title: "Cloud Architecture & Computing",
    description: "Design cloud networks, understand virtualization, secure data, monitor workloads, and connect technology to business needs.",
    meta: "6 modules / Architecture guide",
    accent: "cyan",
  },
];

function TopicLanding({ onSelect }) {
  return (
    <main className="topic-landing">
      <div className="topic-landing__grid" aria-hidden="true" />
      <div className="topic-landing__content">
        <motion.p className="topic-landing__eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span aria-hidden="true" /> Computing Field Guide
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>
          <h1>Choose a topic.<br /><strong>Start remembering.</strong></h1>
          <p className="topic-landing__lede">A growing collection of quick-reference guides for the concepts you are learning, building, and returning to later.</p>
        </motion.div>

        <div className="topic-landing__topics" aria-label="Available topics">
          {topics.map((topic, index) => (
            <motion.button className={`topic-card topic-card--${topic.accent}`} type="button" onClick={() => onSelect(topic.id)} key={topic.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 + index * .1 }} whileHover={{ y: -7 }} whileTap={{ scale: .98 }}>
              <span className="topic-card__number">{topic.number}</span>
              <span className="topic-card__arrow" aria-hidden="true">↗</span>
              <span className="topic-card__title">{topic.title}</span>
              <span className="topic-card__description">{topic.description}</span>
              <span className="topic-card__meta">{topic.meta}</span>
            </motion.button>
          ))}
        </div>
        <p className="topic-landing__note"><span>FIELD NOTE</span> More topics will be added as they become useful—not before.</p>
      </div>
    </main>
  );
}

export default TopicLanding;
