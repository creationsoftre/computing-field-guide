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

const testingTypes = [
  { name: "Unit testing", short: "One piece", purpose: "Verifies an individual function, method, or class behaves as expected in isolation.", practice: "Developers use small, repeatable tests with controlled inputs and mocked dependencies.", example: "A password validator test confirms that an eight-character password with a number is accepted." },
  { name: "Integration testing", short: "Connections", purpose: "Checks that two or more components, services, or systems work together correctly.", practice: "The test exercises real boundaries such as an API, database, message queue, or payment provider.", example: "A registration test confirms the API saves a new user and sends the expected welcome event." },
  { name: "System testing", short: "The whole product", purpose: "Validates the complete integrated system against its specified functional and quality requirements.", practice: "Testers use realistic workflows in an environment that resembles production.", example: "A retail system test walks through browsing, checkout, payment, confirmation, and order history." },
  { name: "Acceptance testing", short: "Business fit", purpose: "Confirms the product meets user, customer, and business needs well enough to accept or release it.", practice: "Customers, product owners, or representative users evaluate agreed acceptance criteria.", example: "A product owner accepts a reporting feature when it exports the required fields and matches the approved format." },
  { name: "Performance testing", short: "Speed and scale", purpose: "Measures responsiveness, stability, throughput, and scalability under expected or extreme load.", practice: "Teams use load, stress, spike, and endurance tests to observe behavior and bottlenecks.", example: "A load test verifies that a course site responds within two seconds for 5,000 concurrent learners." },
  { name: "Security testing", short: "Resilience", purpose: "Finds vulnerabilities, unsafe behavior, and weaknesses that could expose systems or data.", practice: "Teams combine scanning, dependency checks, threat modeling, and authorized penetration testing.", example: "A security test confirms a user cannot view another customer’s invoice by changing an ID in the URL." },
  { name: "Usability testing", short: "Human fit", purpose: "Assesses how easily real users can understand, navigate, and complete tasks in the product.", practice: "Observers give representative users realistic tasks and record confusion, errors, and completion time.", example: "Five new users try to reset a password while the team notes where they hesitate or choose the wrong control." },
  { name: "Regression testing", short: "Nothing broke", purpose: "Checks that new changes or fixes did not unintentionally break existing behavior.", practice: "A repeatable suite runs after changes, with high-value workflows prioritized for fast feedback.", example: "After changing tax calculations, the team reruns checkout, refunds, receipts, and account-balance tests." },
];

const metrics = [
  { name: "Process metrics", focus: "How the work flows", examples: "Cycle time, lead time, team productivity, deployment frequency, velocity", meaning: "Help a team find bottlenecks and improve the way work moves from idea to delivery." },
  { name: "Product metrics", focus: "What was built", examples: "Code complexity, defect density, test coverage, user satisfaction", meaning: "Show the quality, maintainability, reliability, and usefulness of the software itself." },
  { name: "Project metrics", focus: "How the project is tracking", examples: "Budget adherence, timeline performance, scope changes, resource utilization", meaning: "Help leaders understand whether the project remains within its agreed constraints." },
];

const managementSteps = [
  ["Initiation", "Align on why the project exists.", "A team defines a scheduling app’s goal, identifies students and administrators as stakeholders, and creates a project charter."],
  ["Planning", "Turn the goal into an executable approach.", "The team creates a work breakdown structure, estimates tasks, sets milestones, assigns resources, and records risks such as unclear requirements."],
  ["Execution", "Coordinate people and produce the deliverables.", "Developers build the highest-priority scheduling workflow while the project manager removes blockers and keeps communication active."],
  ["Monitoring & control", "Compare reality with the plan and adjust deliberately.", "A delayed integration is escalated, its schedule impact is documented, and the team decides whether to add capacity or change scope."],
  ["Closure", "Finish responsibly and capture what was learned.", "The customer accepts the release, documentation is finalized, resources are released, and the team records lessons for the next project."],
];

const deliveryStages = {
  waterfall: ["Define requirements", "Design solution", "Build system", "Test system", "Deploy and maintain"],
  agile: ["Prioritize backlog", "Plan iteration", "Build and test", "Review with customer", "Adapt and repeat"],
};

function SdlcChapter() {
  const [selectedId, setSelectedId] = useState("waterfall");
  const [selectedTest, setSelectedTest] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState("waterfall");
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

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-delivery">
        <div className="sdlc-chapter__content">
          <p className="section-label">Method in motion</p>
          <h2>The stages change with the rhythm.</h2>
          <p className="sdlc-chapter__description">Both approaches plan, build, test, and deliver. Waterfall usually completes those stages in larger sequential gates; Agile revisits them in short iterations.</p>
          <div className="sdlc-toggle" role="tablist" aria-label="Delivery stage comparison">
            {Object.keys(deliveryStages).map((model) => <button className={selectedDelivery === model ? "active" : ""} type="button" role="tab" aria-selected={selectedDelivery === model} onClick={() => setSelectedDelivery(model)} key={model}>{model}</button>)}
          </div>
          <div className="sdlc-delivery-flow">{deliveryStages[selectedDelivery].map((stage, index) => <div key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>{index < 4 && <i>→</i>}</div>)}</div>
          <p className="sdlc-example"><strong>Example:</strong> {selectedDelivery === "waterfall" ? "A hospital system may complete and approve requirements and design before implementation because compliance and traceability are critical." : "A learning product may release a basic enrollment flow, observe students using it, and reprioritize the next iteration from that feedback."}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section sdlc-chapter__section--alt" id="sdlc-testing">
        <div className="sdlc-chapter__content">
          <p className="section-label">Quality assurance</p>
          <h2>Testing is a conversation with risk.</h2>
          <p className="sdlc-chapter__description">No single test proves that software is good. Each type asks a different question, from “does this function work?” to “can a real person use this safely?”</p>
          <div className="sdlc-testing-layout">
            <div className="sdlc-testing-picker" role="tablist" aria-label="Software testing types">
              {testingTypes.map((test, index) => <button className={selectedTest === index ? "active" : ""} type="button" role="tab" aria-selected={selectedTest === index} onClick={() => setSelectedTest(index)} key={test.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{test.name}</strong><small>{test.short}</small></button>)}
            </div>
            <div className="sdlc-testing-card" role="tabpanel">
              <span>{String(selectedTest + 1).padStart(2, "0")} / {testingTypes[selectedTest].short}</span>
              <h3>{testingTypes[selectedTest].name}</h3>
              <p>{testingTypes[selectedTest].purpose}</p>
              <div className="sdlc-testing-details"><div><strong>In practice</strong><p>{testingTypes[selectedTest].practice}</p></div><div><strong>Example</strong><p>{testingTypes[selectedTest].example}</p></div></div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-metrics">
        <div className="sdlc-chapter__content">
          <p className="section-label">Measurement</p>
          <h2>Metrics turn a feeling into a signal.</h2>
          <p className="sdlc-chapter__description">A metric is useful when it answers a decision-making question. The goal is not to collect numbers; it is to notice risk, understand quality, and improve the next decision.</p>
          <div className="sdlc-metrics-grid">{metrics.map((metric) => <article key={metric.name}><span>{metric.name}</span><h3>{metric.focus}</h3><p>{metric.meaning}</p><strong>Examples</strong><small>{metric.examples}</small></article>)}</div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section sdlc-chapter__section--alt" id="sdlc-management">
        <div className="sdlc-chapter__content">
          <p className="section-label">Project management</p>
          <h2>Move the project from intent to closure.</h2>
          <p className="sdlc-chapter__description">Project management is the coordination layer around the technical work: aligning people, scope, time, resources, risks, communication, and acceptance.</p>
          <div className="sdlc-management-list">{managementSteps.map(([title, summary, example], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><strong>{summary}</strong><p><b>Example:</b> {example}</p></div></article>)}</div>
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
