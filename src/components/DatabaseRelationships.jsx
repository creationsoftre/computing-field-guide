import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import AnimatedSection from "./AnimatedSection";
import { databaseStructures, databases, indexQueries, supportStructures } from "../data/DatabaseData";

function DatabaseRelationships() {
  const [structure, setStructure] = useState(databaseStructures[0]);
  const [query, setQuery] = useState(indexQueries[0]);
  const [support, setSupport] = useState(supportStructures[0]);
  const [database, setDatabase] = useState(databases[0]);
  const scope = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".database-chapter__orbit-node", { scale: 0, opacity: 0, stagger: 0.08, duration: 0.7, ease: "back.out(1.8)" });
    }, scope);
    return () => context.revert();
  }, []);

  return (
    <div className="database-chapter" ref={scope}>
      <AnimatedSection className="database-chapter__intro" id="databases">
        <div className="database-chapter__content database-chapter__hero-grid">
          <div>
            <p className="section-label">Data structures × databases</p>
            <h2>The machinery behind every query.</h2>
            <p className="database-chapter__lede">Databases use data structures to store, organize, search, and update information efficiently. The structure you choose shapes what the database can do quickly.</p>
            <div className="database-chapter__callout"><strong>Important distinction</strong><span>A data structure is not automatically an index. Indexes are tools built with structures such as hash maps, B+Trees, and bitmaps.</span></div>
          </div>
          <div className="database-chapter__orbit" aria-hidden="true">
            <span className="database-chapter__orbit-core">DATA</span>
            {databaseStructures.slice(2, 7).map((item, index) => <span className={`database-chapter__orbit-node orbit-${index + 1}`} key={item.name}>{item.glyph}</span>)}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="database-chapter__section">
        <div className="database-chapter__content">
          <p className="section-label">01 — Structure explorer</p>
          <h2>Same data. Different superpowers.</h2>
          <p className="database-chapter__description">Choose a structure to see how its shape becomes a database capability.</p>
          <div className="database-tabs" role="tablist" aria-label="Data structures">
            {databaseStructures.map((item) => <button data-gsap-button role="tab" aria-selected={structure.name === item.name} className={structure.name === item.name ? "active" : ""} onClick={() => setStructure(item)} key={item.name}>{item.name}</button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div className="structure-lab" key={structure.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
              <div className={`structure-lab__visual structure-lab__visual--${structure.name.toLowerCase().replace(/[^a-z]/g, "")}`}>
                {structure.visual.map((value, index) => <motion.span initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: index * 0.08 }} key={`${value}-${index}`}>{value}</motion.span>)}
              </div>
              <div className="structure-lab__copy"><span>{structure.glyph} · {structure.name}</span><h3>{structure.simple}</h3><dl><div><dt>Inside a database</dt><dd>{structure.use}</dd></div><div><dt>Best for</dt><dd>{structure.best}</dd></div></dl></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedSection>

      <AnimatedSection className="database-chapter__section database-chapter__section--index">
        <div className="database-chapter__content">
          <p className="section-label">02 — Index lab</p>
          <h2>Don’t scan every row. Build a shortcut.</h2>
          <p className="database-chapter__description">Like the index in a book, a database index points toward the right data. Pick a query and see the best shortcut.</p>
          <div className="index-lab">
            <div className="index-lab__queries">{indexQueries.map((item, index) => <button className={query.label === item.label ? "active" : ""} onClick={() => setQuery(item)} key={item.label}><span>0{index + 1}</span>{item.label}</button>)}</div>
            <AnimatePresence mode="wait"><motion.div className="index-lab__answer" key={query.label} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}><span className="index-lab__status">Recommended index</span><code>{query.query}</code><h3>{query.answer}</h3><p>{query.why}</p><div className="index-lab__path"><i>Query</i><b>→</b><i>Index</i><b>→</b><i>Rows</i></div></motion.div></AnimatePresence>
          </div>
          <div className="index-tradeoffs"><div><span>With the right index</span><strong>Faster search, filtering, sorting, joins</strong><small>Indexes can also enforce unique values.</small></div><div><span>The cost</span><strong>More storage and slower writes</strong><small>Inserts, updates, and removals must also update the index. Too many can hurt performance.</small></div></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="database-chapter__section">
        <div className="database-chapter__content">
          <p className="section-label">03 — Beyond indexing</p><h2>Structures that keep systems moving.</h2><p className="database-chapter__description">At scale, databases also need to absorb writes, avoid wasted reads, spread traffic, and repair replicas.</p>
          <div className="support-tabs">{supportStructures.map((item) => <button className={support.name === item.name ? "active" : ""} onClick={() => setSupport(item)} key={item.name}><small>{item.tag}</small>{item.name}</button>)}</div>
          <AnimatePresence mode="wait"><motion.div className="support-panel" key={support.name} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><div><span>Primary job</span><h3>{support.purpose}</h3><p>{support.summary}</p><small>Used in {support.uses}.</small></div><div className="support-panel__lists"><div><span>Strengths</span>{support.pros.map(item => <p key={item}>+ {item}</p>)}</div><div><span>Tradeoffs</span>{support.cons.map(item => <p key={item}>— {item}</p>)}</div></div></motion.div></AnimatePresence>
        </div>
      </AnimatedSection>

      <AnimatedSection className="database-chapter__section database-chapter__section--choose">
        <div className="database-chapter__content">
          <p className="section-label">04 — Database chooser</p><h2>Start with the workload.</h2><p className="database-chapter__description">No database is best for every application. Choose the requirement that matters most.</p>
          <div className="database-chooser">
            <div className="database-chooser__rail">{databases.map(item => <button className={database.name === item.name ? "active" : ""} onClick={() => setDatabase(item)} key={item.name}><span>{item.signal}</span><strong>{item.name}</strong><small>{item.type}</small></button>)}</div>
            <AnimatePresence mode="wait"><motion.article className="database-card" data-gsap-card key={database.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span>{database.type}</span><h3>{database.name}</h3><p>{database.description}</p><code>{database.example}</code><div className="database-card__strengths">{database.strengths.map(item => <i key={item}>{item}</i>)}</div><div className="database-card__structures"><span>Best-fit data structures</span>{database.structures.map((item, index) => <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + index * .08 }} key={item.name}><strong>{item.name}</strong><p>{item.reason}</p></motion.div>)}</div><p><strong>Best for:</strong> {database.uses}.</p>{database.caveat && <small>{database.caveat}</small>}</motion.article></AnimatePresence>
          </div>
          <div className="database-checklist"><span>Before you choose, ask:</span>{["How is the data structured?", "How will it be searched?", "How often does it change?", "How much traffic is expected?", "Must it survive server failures?", "Consistency or availability—which matters more?"].map(item => <p key={item}>{item}</p>)}</div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default DatabaseRelationships;
