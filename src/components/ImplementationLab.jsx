import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  getImplementation,
  implementationLanguages,
  implementationStructures,
} from "../data/ImplementationLabData";
import AnimatedSection from "./AnimatedSection";

function CodeLines({ code }) {
  return code.split("\n").map((line, index) => {
    const trimmed = line.trim();
    const comment = trimmed.startsWith("//") || trimmed.startsWith("#");
    return (
      <span className="implementation-code__line" key={`${index}-${line}`}>
        <i aria-hidden="true">{index + 1}</i>
        <span className={comment ? "implementation-code__comment" : ""}>{line || " "}</span>
      </span>
    );
  });
}

function ImplementationLab() {
  const [structure, setStructure] = useState(implementationStructures[0]);
  const [language, setLanguage] = useState(implementationLanguages[0]);
  const [copiedKey, setCopiedKey] = useState("");
  const reduceMotion = useReducedMotion();
  const implementation = getImplementation(structure, language);

  const selectionKey = `${structure}-${language}`;

  const copyCode = async () => {
    await navigator.clipboard.writeText(implementation.code);
    setCopiedKey(selectionKey);
    window.setTimeout(() => setCopiedKey(""), 1600);
  };

  const panelMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 14, filter: "blur(3px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -8, filter: "blur(2px)" },
      };

  return (
    <AnimatedSection className="implementation-lab" id="implementations">
      <div className="implementation-lab__content">
        <p className="section-label">Implementation lab</p>
        <h2>One idea. Seven languages.</h2>
        <p className="implementation-lab__description">
          Choose a structure, then switch languages to see how the same idea is
          expressed. These compact implementations favor clarity over production features.
        </p>

        <div className="implementation-controls">
          <div>
            <span className="implementation-controls__label">1 · Choose a structure</span>
            <div className="implementation-picker" role="tablist" aria-label="Choose a data structure">
              {implementationStructures.map((item) => (
                <button
                  aria-selected={item === structure}
                  className={item === structure ? "active" : ""}
                  data-gsap-button
                  key={item}
                  onClick={() => setStructure(item)}
                  role="tab"
                  type="button"
                >
                  {item}
                  {item === structure && <motion.span className="implementation-picker__active" layoutId="structure-active" />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="implementation-controls__label">2 · Toggle the language</span>
            <div className="implementation-picker implementation-picker--languages" role="tablist" aria-label="Choose a programming language">
              {implementationLanguages.map((item) => (
                <button
                  aria-selected={item === language}
                  className={item === language ? "active" : ""}
                  data-gsap-button
                  key={item}
                  onClick={() => setLanguage(item)}
                  role="tab"
                  type="button"
                >
                  {item}
                  {item === language && <motion.span className="implementation-picker__active" layoutId="language-active" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            animate={panelMotion.animate}
            className="implementation-workspace"
            exit={panelMotion.exit}
            initial={panelMotion.initial}
            key={selectionKey}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="implementation-code">
              <div className="implementation-code__bar">
                <div aria-hidden="true"><i /><i /><i /></div>
                <span>{structure} · {language}</span>
                <button onClick={copyCode} type="button" aria-live="polite">
                  {copiedKey === selectionKey ? "Copied!" : "Copy code"}
                </button>
              </div>
              <pre tabIndex="0" aria-label={`${structure} implementation in ${language}`}>
                <code><CodeLines code={implementation.code} /></code>
              </pre>
            </div>

            <aside className="implementation-notes">
              <span className="implementation-notes__eyebrow">How it works</span>
              <h3>{structure}</h3>
              <p>{implementation.summary}</p>
              <ol>
                {implementation.steps.map((step, index) => (
                  <motion.li
                    animate={{ opacity: 1, x: 0 }}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    key={step}
                    transition={{ delay: reduceMotion ? 0 : 0.1 + index * 0.07 }}
                  >
                    <i>{index + 1}</i>{step}
                  </motion.li>
                ))}
              </ol>
              <div className="implementation-complexity">
                {implementation.complexity.map((item) => <code key={item}>{item}</code>)}
              </div>
              <small>
                Educational implementation: validation, resizing, and some edge cases are intentionally omitted.
              </small>
            </aside>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export default ImplementationLab;
