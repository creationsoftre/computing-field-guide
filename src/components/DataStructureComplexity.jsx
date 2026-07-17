import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import dataStructureData from "../data/DataStructureData";
import AnimatedSection from "./AnimatedSection";

const operationLabels = {
  access: "Access",
  insertion: "Insertion",
  removal: "Removal",
  traversal: "Traversal",
  search: "Search",
};

function DataStructureComplexity() {
  const [selectedId, setSelectedId] = useState(dataStructureData[0].id);
  const selectedStructure = dataStructureData.find(
    (structure) => structure.id === selectedId,
  );

  return (
    <AnimatedSection className="data-structures">
      <div className="data-structures__content">
        <p className="section-label">Data Structure Tradeoffs</p>
        <h2>Time and space complexity by structure</h2>
        <p className="data-structures__description">
          Choose a structure to compare its best and worst cases. The stated
          implementation matters: the same abstract structure can have
          different costs when built differently.
        </p>

        <div className="structure-picker" aria-label="Select a data structure">
          {dataStructureData.map((structure) => (
            <button
              className={
                structure.id === selectedId
                  ? "structure-picker__button structure-picker__button--active"
                  : "structure-picker__button"
              }
              data-gsap-button
              key={structure.id}
              onClick={() => setSelectedId(structure.id)}
              type="button"
            >
              {structure.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="structure-details"
            key={selectedStructure.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="structure-details__header">
              <div>
                <p>{selectedStructure.implementation}</p>
                <h3>{selectedStructure.name}</h3>
                <span>{selectedStructure.summary}</span>
              </div>
              <div className="structure-space">
                <span>Storage space</span>
                <strong>{selectedStructure.space}</strong>
              </div>
            </div>

            <div className="structure-table-wrap">
              <table className="structure-table">
                <thead>
                  <tr>
                    <th scope="col">Operation</th>
                    <th scope="col">Best case</th>
                    <th scope="col">Worst case</th>
                    <th scope="col">Why?</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(selectedStructure.operations).map(
                    ([operation, [best, worst, note]]) => (
                      <tr key={operation}>
                        <th scope="row">{operationLabels[operation]}</th>
                        <td><code>{best}</code></td>
                        <td><code>{worst}</code></td>
                        <td>{note}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="structure-notation-note">
          <strong>n</strong> = stored items, <strong>V</strong> = vertices,
          and <strong>E</strong> = edges. Space refers to total storage.
        </p>
      </div>
    </AnimatedSection>
  );
}

export default DataStructureComplexity;
