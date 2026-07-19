import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import languageStructureData from "../data/LanguageStructureData";
import AnimatedSection from "./AnimatedSection";

function StructuresByLanguage() {
  const languages = Object.keys(languageStructureData);
  const [language, setLanguage] = useState(languages[0]);

  return (
    <AnimatedSection className="language-structures" id="languages">
      <div className="language-structures__content">
        <p className="section-label">From theory to code</p>
        <h2>Data structures by language</h2>
        <p className="language-structures__description">
          Languages package the same core ideas differently. Compare their
          common built-in and standard-library choices, typical performance,
          storage cost, and everyday uses.
        </p>

        <div className="language-picker" aria-label="Select a programming language">
          {languages.map((item) => (
            <button
              className={item === language ? "language-picker__button language-picker__button--active" : "language-picker__button"}
              key={item}
              onClick={() => setLanguage(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="language-table-wrap"
            key={language}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <table className="language-table">
              <thead>
                <tr>
                  <th scope="col">Structure</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Typical operation time</th>
                  <th scope="col">Memory overhead</th>
                  <th scope="col">Common use case</th>
                </tr>
              </thead>
              <tbody>
                {languageStructureData[language].map(([structure, bestFor, time, memory, useCase]) => (
                  <tr key={structure}>
                    <th data-label="Structure" scope="row">{structure}</th>
                    <td data-label="Best for">{bestFor}</td>
                    <td data-label="Typical operation time">
                      <code className="language-table__timings">
                        {time.split("; ").map((timing) => (
                          <span key={timing}>{timing}</span>
                        ))}
                      </code>
                    </td>
                    <td data-label="Memory overhead"><span className={`memory-badge memory-badge--${memory.toLowerCase().replace(" ", "-")}`}>{memory}</span></td>
                    <td data-label="Common use case">{useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>

        <p className="language-structures__note">
          <strong>* Amortized.</strong> Memory ratings compare container
          overhead—not the stored values—and vary by runtime and implementation.
          Average hash-table times assume a healthy hash distribution.
        </p>
      </div>
    </AnimatedSection>
  );
}

export default StructuresByLanguage;
