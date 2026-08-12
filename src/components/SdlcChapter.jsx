import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const methodologies = [
  {
    id: "waterfall",
    label: "Waterfall",
    number: "01",
    summary: "A sequential approach where each phase is completed before the next begins.",
    bestFor: "Stable requirements, regulated work, and projects that need a predictable plan.",
    strengths: ["Clear milestones", "Detailed documentation", "Easy to measure against a plan"],
    tradeoff: "Changes discovered late can be expensive because earlier phases are already complete.",
    pattern: ["Requirements", "Design", "Build", "Test", "Deploy"],
  },
  {
    id: "agile",
    label: "Agile",
    number: "02",
    summary: "An iterative approach that delivers working software frequently and adapts to feedback.",
    bestFor: "Uncertain or evolving requirements, collaborative teams, and products that benefit from frequent delivery.",
    strengths: ["Fast feedback", "Customer collaboration", "Responds well to change"],
    tradeoff: "Without a shared direction, flexibility can become shifting scope and inconsistent priorities.",
    pattern: ["Plan", "Build", "Review", "Adapt", "Repeat"],
  },
  {
    id: "hybrid",
    label: "Hybrid",
    number: "03",
    summary: "A tailored blend of Waterfall structure and Agile iteration.",
    bestFor: "Projects with fixed governance or milestones but flexible implementation details.",
    strengths: ["Balances structure and flexibility", "Supports risk management", "Fits project constraints"],
    tradeoff: "The team must define which parts are fixed and which parts can change, or the model becomes confusing.",
    pattern: ["Phase", "Iterate", "Validate", "Gate", "Next phase"],
  },
];

const phases = [
  ["01", "Initiation", "Define the purpose, goals, stakeholders, and high-level requirements."],
  ["02", "Planning", "Break the work into tasks, timelines, resources, risks, and deliverables."],
  ["03", "Execution", "Assign work, build the product, communicate progress, and maintain quality."],
  ["04", "Monitoring & Control", "Compare progress to the plan, manage risks, and correct deviations."],
  ["05", "Closure", "Complete deliverables, receive acceptance, document lessons learned, and release resources."],
];

const reviewPoints = [
  ["Waterfall", "Predictability over flexibility"],
  ["Agile", "Working software and feedback over excessive process"],
  ["Hybrid", "A deliberate balance based on project needs"],
  ["Good judgment", "Choose the approach that fits the risk, requirements, and team"],
];

function SdlcChapter() {
  const [selectedId, setSelectedId] = useState("waterfall");
  const selected = methodologies.find((methodology) => methodology.id === selectedId);

  return (
    <div className="sdlc-chapter">
      <AnimatedSection className="sdlc-chapter__intro" id="sdlc">
        <div className="sdlc-chapter__content">
          <div className="sdlc-chapter__hero-grid">
            <div>
              <p className="section-label">09 / Software engineering</p>
              <h2>How software gets from idea to operation.</h2>
              <p className="sdlc-chapter__lede">
                The Software Development Life Cycle is a way to organize the work of creating, delivering, and maintaining software. The methodology shapes how a team plans, builds, tests, and responds to change.
              </p>
              <div className="sdlc-chapter__callout">
                <strong>Quick recall</strong>
                <span>Waterfall moves through defined phases. Agile works in short feedback loops. Hybrid intentionally combines both.</span>
              </div>
            </div>
            <div className="sdlc-chapter__orbit" aria-hidden="true">
              <span className="sdlc-chapter__orbit-core">SDLC</span>
              {['Plan', 'Build', 'Test', 'Release', 'Learn'].map((label, index) => (
                <span className={`sdlc-chapter__orbit-node sdlc-orbit-${index + 1}`} key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-methodologies">
        <div className="sdlc-chapter__content">
          <p className="section-label">Choose a methodology</p>
          <h2>Three ways to organize the work.</h2>
          <p className="sdlc-chapter__description">Start with the short version, then use the details to review tradeoffs, fit, and the way work flows through the project.</p>
          <div className="sdlc-methodology-picker" role="tablist" aria-label="SDLC methodologies">
            {methodologies.map((methodology) => (
              <button className={selectedId === methodology.id ? "active" : ""} type="button" role="tab" aria-selected={selectedId === methodology.id} onClick={() => setSelectedId(methodology.id)} key={methodology.id}>
                <span>{methodology.number}</span>
                <strong>{methodology.label}</strong>
                <small>{methodology.id === "waterfall" ? "Sequential" : methodology.id === "agile" ? "Iterative" : "Blended"}</small>
              </button>
            ))}
          </div>
          <div className="sdlc-methodology-card" role="tabpanel">
            <div className="sdlc-methodology-card__main">
              <span className="sdlc-methodology-card__eyebrow">{selected.number} / {selected.label}</span>
              <h3>{selected.summary}</h3>
              <div className="sdlc-flow" aria-label={`${selected.label} flow`}>
                {selected.pattern.map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, "0")}</i>{step}</span>)}
              </div>
              <p><strong>Best fit:</strong> {selected.bestFor}</p>
            </div>
            <div className="sdlc-methodology-card__details">
              <div><span>Strengths</span><ul>{selected.strengths.map((strength) => <li key={strength}>{strength}</li>)}</ul></div>
              <div className="sdlc-tradeoff"><span>Watch for</span><p>{selected.tradeoff}</p></div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section sdlc-chapter__section--alt" id="sdlc-phases">
        <div className="sdlc-chapter__content">
          <p className="section-label">Project lifecycle</p>
          <h2>The work still needs a rhythm.</h2>
          <p className="sdlc-chapter__description">Methodologies change the rhythm and level of detail, but most projects still need to establish direction, perform the work, inspect results, and close responsibly.</p>
          <div className="sdlc-phase-grid">
            {phases.map(([number, title, description]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-review">
        <div className="sdlc-chapter__content">
          <p className="section-label">Review deck</p>
          <h2>Keep these distinctions handy.</h2>
          <div className="sdlc-review-grid">
            {reviewPoints.map(([term, definition]) => <div key={term}><span>{term}</span><p>{definition}</p></div>)}
          </div>
          <div className="sdlc-chapter__callout sdlc-chapter__callout--final"><strong>Exam mindset</strong><span>Do not choose a methodology because it is fashionable. Match it to requirement stability, risk, customer involvement, compliance needs, and how costly change will be.</span></div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default SdlcChapter;
