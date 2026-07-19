import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import searchSortData from "../data/SearchSortData";
import AnimatedSection from "./AnimatedSection";

function SearchSortComplexity({ category }) {
  const algorithms = searchSortData[category];
  const [selectedId, setSelectedId] = useState(algorithms[0].id);
  const algorithm = algorithms.find((item) => item.id === selectedId);
  const isSearch = category === "search";

  return (
    <AnimatedSection className="search-sort" id="search-sort">
      <div className="search-sort__content">
        <p className="section-label">{isSearch ? "Search algorithms" : "Sorting algorithms"}</p>
        <h2>{isSearch ? "Find the value you need." : "Put data in order."}</h2>
        <p className="search-sort__description">
          {isSearch
            ? "Searching locates a target within a collection. Compare a sequential scan with an approach that repeatedly eliminates half of a sorted range."
            : "Sorting rearranges values into a defined order. Select an algorithm to see how its strategy changes its time, space, and stability tradeoffs."}
        </p>

        <div className="algorithm-picker" aria-label={`Select a ${category} algorithm`}>
          {algorithms.map((item) => (
            <button
              className={item.id === algorithm.id ? "algorithm-picker__button algorithm-picker__button--active" : "algorithm-picker__button"}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              type="button"
            >
              {item.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            className="algorithm-details"
            key={algorithm.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <div className="algorithm-details__intro">
              <div>
                <p>{category === "search" ? "Search method" : "Sorting method"}</p>
                <h3>{algorithm.name}</h3>
                <span>{algorithm.summary}</span>
              </div>
              {algorithm.stable && <div className="algorithm-stability"><span>Stable</span><strong>{algorithm.stable}</strong></div>}
            </div>

            <div className="algorithm-complexities">
              {[["Best time", algorithm.best], ["Average time", algorithm.average], ["Worst time", algorithm.worst], ["Auxiliary space", algorithm.space]].map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>

            <div className="algorithm-notes">
              <div><span>Key characteristic</span><p>{algorithm.requirement}</p></div>
              <div><span>Good fit</span><p>{algorithm.useCase}</p></div>
            </div>

            {algorithm.steps && (
              <ol className="algorithm-steps">
                {algorithm.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            )}
          </motion.article>
        </AnimatePresence>

        <p className="search-sort__note">
          Complexity describes growth as input size <strong>n</strong> increases. Radix sort also uses <strong>d</strong> for key length and <strong>k</strong> for the digit range; Shell sort bounds vary by gap sequence.
        </p>
      </div>
    </AnimatedSection>
  );
}

export default SearchSortComplexity;
