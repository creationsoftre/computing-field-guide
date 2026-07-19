import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import dataStructureGuideData from "../data/DataStructureGuideData";
import AnimatedSection from "./AnimatedSection";

function DataStructureGuide() {
  const [selectedName, setSelectedName] = useState(dataStructureGuideData[0].name);
  const selected = dataStructureGuideData.find((item) => item.name === selectedName);

  return (
    <AnimatedSection className="structure-guide">
      <div className="structure-guide__content">
        <p className="section-label">Practical data-structure guide</p>
        <h2>Choose a structure for the job.</h2>
        <p className="structure-guide__description">Compare defining behavior, common applications, operation costs, and the tradeoffs that matter in real programs.</p>
        <div className="structure-guide__picker" aria-label="Select a data structure">
          {dataStructureGuideData.map((item) => <button className={item.name === selectedName ? "structure-guide__button structure-guide__button--active" : "structure-guide__button"} key={item.name} onClick={() => setSelectedName(item.name)} type="button">{item.name}</button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.article className="structure-guide__panel" key={selected.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            <div className="structure-guide__heading"><div><p>Data structure</p><h3>{selected.name}</h3></div><p>{selected.characteristics}</p></div>
            <div className="structure-guide__times">
              {[["Access", selected.access], ["Insertion", selected.insertion], ["Deletion", selected.deletion]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <div className="structure-guide__facts">
              <div><span>Common use cases</span><p>{selected.useCases}</p></div>
              <div><span>Best suited for</span><p>{selected.bestFor}</p></div>
              <div className="structure-guide__pro"><span>Advantages</span><p>{selected.advantages}</p></div>
              <div className="structure-guide__con"><span>Disadvantages</span><p>{selected.disadvantages}</p></div>
            </div>
          </motion.article>
        </AnimatePresence>
        <p className="structure-guide__note">Times assume the stated common implementation. <strong>deg(V)</strong> is the number of edges touching a vertex.</p>
      </div>
    </AnimatedSection>
  );
}

export default DataStructureGuide;
