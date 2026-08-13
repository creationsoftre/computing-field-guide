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

const umlTypes = [
  ["Use case", "Captures actors, goals, and system interactions.", "Clarify what users need the system to do."],
  ["Class", "Models classes, attributes, methods, and relationships.", "Design object-oriented structure before coding."],
  ["Sequence", "Shows messages exchanged in time order.", "Explain a login, checkout, or API request flow."],
  ["Activity", "Maps actions, decisions, and parallel paths.", "Describe business workflows and process logic."],
  ["State machine", "Shows states and the events that change them.", "Model orders, tickets, accounts, or devices over time."],
  ["Component", "Shows software components and their dependencies.", "Communicate high-level architecture and integration points."],
  ["Deployment", "Maps software artifacts to hardware or runtime nodes.", "Plan where services, databases, and clients run."],
  ["Package", "Groups related model elements into logical boundaries.", "Keep large designs organized and understandable."],
];

const nfrs = [
  ["Performance", "How fast does it respond?", "The search results should appear within two seconds for 95% of requests."],
  ["Scalability", "Can it handle growth?", "The service should support ten times today’s users without redesigning the core system."],
  ["Security", "How is it protected?", "Sensitive data must be encrypted in transit and at rest, with access based on roles."],
  ["Usability", "Can people use it effectively?", "A first-time user should complete checkout without training or assistance."],
  ["Reliability", "Does it keep working?", "The service should maintain 99.9% availability and recover from a failed instance."],
  ["Maintainability", "Can the team change it safely?", "A developer should be able to locate and update a pricing rule without changing unrelated modules."],
  ["Testability", "Can behavior be verified?", "Core business rules should have automated tests and clear seams for dependencies."],
];

const useCases = [
  {
    name: "Enroll in a course",
    actor: "Student",
    goal: "Enroll in an available course and receive confirmation.",
    preconditions: "The student is authenticated and the course is open for enrollment.",
    flow: ["Student searches for a course", "System displays matching courses", "Student selects Enroll", "System validates availability", "System saves enrollment and shows confirmation"],
    alternate: "If the course is full, the system explains the issue and offers a waitlist option.",
  },
  {
    name: "Approve a course",
    actor: "Administrator",
    goal: "Review and approve a proposed course for students to see.",
    preconditions: "The administrator is authenticated and the course is in Draft status.",
    flow: ["Administrator opens the draft", "System displays requirements and warnings", "Administrator selects Approve", "System changes status to Available", "System records the approval event"],
    alternate: "If required information is missing, the system keeps the course in Draft and identifies what must be corrected.",
  },
];

function UmlDiagram({ type }) {
  const diagrams = {
    "Use case": <><g className="diagram-lines"><path d="M135 135H290M570 135h55" /></g><g className="diagram-actor"><circle cx="80" cy="112" r="16" /><path d="M80 128v48m-27-25h54m-27 0-25 38m25-38 25 38" /><text x="43" y="220">Student</text></g><rect className="diagram-boundary" x="290" y="30" width="280" height="205" rx="10" /><text className="diagram-label" x="322" y="57">Course platform</text><ellipse className="diagram-usecase" cx="430" cy="100" rx="92" ry="30" /><text x="377" y="105">Browse courses</text><ellipse className="diagram-usecase" cx="430" cy="165" rx="92" ry="30" /><text x="377" y="170">Enroll in course</text><g className="diagram-actor"><circle cx="655" cy="112" r="16" /><path d="M655 128v48m-27-25h54m-27 0-25 38m25-38 25 38" /><text x="621" y="220">Admin</text></g></>,
    Class: <><rect className="diagram-entity" x="75" y="45" width="205" height="170" rx="5" /><path className="diagram-entity-head" d="M75 82h205M75 145h205" /><text x="145" y="68">STUDENT</text><text x="92" y="108">- studentId: int</text><text x="92" y="130">- name: string</text><text x="92" y="170">+ enroll(): void</text><text x="92" y="192">+ viewCourses(): list</text><path className="diagram-lines" d="M280 130h160" /><text className="diagram-flow-label" x="330" y="118">enrolls</text><rect className="diagram-entity" x="440" y="45" width="205" height="170" rx="5" /><path className="diagram-entity-head" d="M440 82h205M440 145h205" /><text x="505" y="68">COURSE</text><text x="457" y="108">- courseId: int</text><text x="457" y="130">- title: string</text><text x="457" y="170">+ open(): void</text><text x="457" y="192">+ close(): void</text></>,
    Sequence: <><text className="diagram-label" x="105" y="35">Student</text><text className="diagram-label" x="325" y="35">Course API</text><text className="diagram-label" x="560" y="35">Database</text><path className="diagram-lines diagram-dashed" d="M125 50v180M345 50v180M580 50v180" /><path className="diagram-lines diagram-arrow" d="M125 82h210l-14-7m14 7-14 7M345 135h225l-14-7m14 7-14 7M580 188H125l14-7m-14 7 14 7" /><text x="180" y="75">enroll(courseId)</text><text x="405" y="128">save enrollment</text><text x="300" y="181">confirmation</text></>,
    Activity: <><circle className="diagram-node" cx="100" cy="135" r="14" /><path className="diagram-lines diagram-arrow" d="M114 135h105m80 0h110m80 0h110" /><rect className="diagram-action" x="220" y="105" width="80" height="60" rx="20" /><text x="232" y="140">Select</text><path className="diagram-diamond" d="m410 105 30 30-30 30-30-30z" /><text x="422" y="108">?</text><rect className="diagram-action" x="520" y="75" width="115" height="52" rx="20" /><text x="542" y="106">Enroll</text><rect className="diagram-action" x="520" y="145" width="115" height="52" rx="20" /><text x="542" y="176">Show error</text></>,
    "State machine": <><circle className="diagram-node" cx="85" cy="135" r="14" /><path className="diagram-lines diagram-arrow" d="M100 135h95m130 0h95m130 0h95" /><rect className="diagram-state" x="195" y="105" width="130" height="60" rx="28" /><text x="225" y="140">Available</text><rect className="diagram-state" x="425" y="105" width="130" height="60" rx="28" /><text x="458" y="140">Enrolled</text><text className="diagram-flow-label" x="125" y="123">create</text><text className="diagram-flow-label" x="335" y="123">enroll</text><text className="diagram-flow-label" x="565" y="123">complete</text></>,
    Component: <><rect className="diagram-component" x="80" y="75" width="170" height="110" rx="6" /><text x="120" y="110">Web client</text><text x="112" y="145">[UI]</text><path className="diagram-lines diagram-arrow" d="M250 130h180" /><rect className="diagram-component" x="430" y="75" width="210" height="110" rx="6" /><text x="470" y="110">Course service</text><text x="482" y="145">[API + rules]</text><circle className="diagram-node" cx="350" cy="130" r="8" /></>,
    Deployment: <><path className="diagram-lines" d="M110 95h170v105H110zM420 65h190v135H420zM145 125h100v45H145zM455 95h120v45H455z" /><text x="158" y="150">Browser</text><text className="diagram-label" x="477" y="85">Cloud server</text><text x="475" y="125">Application</text><text x="475" y="175">Database</text><path className="diagram-lines diagram-arrow" d="M280 145h140" /></>,
    Package: <><path className="diagram-package" d="M100 78h105l22 22v110H100zM100 78v22h127" /><text x="130" y="140">Users</text><text x="130" y="165">models</text><path className="diagram-package" d="M390 78h105l22 22v110H390zM390 78v22h127" /><text x="420" y="140">Course</text><text x="420" y="165">services</text><path className="diagram-lines diagram-dashed diagram-arrow" d="M227 145h160" /></>,
  };
  return <svg className="design-diagram" viewBox="0 0 720 270" role="img" aria-label={`${type} UML diagram`}>{diagrams[type] || diagrams["Use case"]}</svg>;
}

function DfdDiagram() {
  return <svg className="design-diagram" viewBox="0 0 760 270" role="img" aria-label="Data flow diagram showing a student request moving through a course service to a course database"><g className="diagram-lines"><path d="M145 135h80m130 0h55m120 0h55" /><path className="diagram-arrow" d="m215 128 15 7-15 7m190-14 15 7-15 7m120-14 15 7-15 7" /></g><rect className="diagram-external" x="25" y="95" width="120" height="80" rx="8" /><text x="60" y="140">Student</text><circle className="diagram-process" cx="295" cy="135" r="55" /><text x="258" y="130">Course</text><text x="261" y="148">service</text><path className="diagram-store" d="M415 98h120v75H415z" /><path className="diagram-store" d="M415 98q60 25 120 0M415 173q60-25 120 0" /><text x="451" y="142">Courses</text><rect className="diagram-external" x="590" y="95" width="120" height="80" rx="8" /><text x="625" y="140">Admin</text><text className="diagram-flow-label" x="158" y="122">request</text><text className="diagram-flow-label" x="335" y="122">read / write</text><text className="diagram-flow-label" x="548" y="122">update</text></svg>;
}

function ErdDiagram() {
  return <svg className="design-diagram" viewBox="0 0 760 270" role="img" aria-label="Entity relationship diagram showing students enrolled in courses"><g className="diagram-lines"><path d="M260 135h240" /><text x="337" y="116">enrolls in</text><text x="270" y="161">1..*</text><text x="465" y="161">1..*</text></g><rect className="diagram-entity" x="35" y="70" width="225" height="130" rx="6" /><rect className="diagram-entity" x="500" y="70" width="225" height="130" rx="6" /><path className="diagram-entity-head" d="M35 110h225M500 110h225" /><text x="120" y="96">STUDENT</text><text x="585" y="96">COURSE</text><text x="58" y="137">PK student_id</text><text x="58" y="162">name</text><text x="523" y="137">PK course_id</text><text x="523" y="162">title</text></svg>;
}

function LowFidelityMockup() {
  return <div className="mockup mockup--low" aria-label="Low fidelity course enrollment wireframe"><div className="wireframe-top"><i /><span>Course Finder</span><b>Menu</b></div><div className="wireframe-body"><div className="wireframe-sidebar"><i /><i /><i /><i /></div><div className="wireframe-main"><span className="wireframe-line wireframe-line--wide" /><span className="wireframe-line" /><div className="wireframe-search" /><div className="wireframe-cards"><div /><div /><div /></div><div className="wireframe-button" /></div></div></div>;
}

function HighFidelityMockup() {
  return <div className="mockup mockup--high" aria-label="High fidelity course enrollment mockup"><div className="high-top"><strong>learn<span>space</span></strong><span>My learning</span><span>Explore</span><b>TS</b></div><div className="high-body"><div className="high-hero"><small>RECOMMENDED FOR YOU</small><h4>Build your next skill.</h4><p>Explore courses matched to your goals.</p><button type="button">Explore courses</button></div><div className="high-course-row"><article><i>DATA</i><strong>Data Structures</strong><small>8 modules · 4.8 ★</small></article><article><i>DESIGN</i><strong>Software Design</strong><small>6 modules · 4.9 ★</small></article></div></div></div>;
}

function SdlcChapter() {
  const [selectedId, setSelectedId] = useState("waterfall");
  const [selectedTest, setSelectedTest] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState("waterfall");
  const [selectedUml, setSelectedUml] = useState(0);
  const [selectedUseCase, setSelectedUseCase] = useState(0);
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

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-design">
        <div className="sdlc-chapter__content">
          <p className="section-label">Software design</p>
          <h2>Turn requirements into a buildable shape.</h2>
          <p className="sdlc-chapter__description">Requirements describe what the system must accomplish. Design translates those needs into structures, interactions, data, boundaries, and technical decisions that a team can implement and test.</p>
          <div className="design-translation"><div><span>Requirement</span><strong>Students can enroll in an available course.</strong></div><i>→</i><div><span>Design decision</span><strong>Use a course service, enrollment rule, and persistent student/course relationship.</strong></div><i>→</i><div><span>Implementation</span><strong>APIs, data tables, validation, permissions, and tests.</strong></div></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section sdlc-chapter__section--alt" id="sdlc-uml">
        <div className="sdlc-chapter__content">
          <p className="section-label">Unified Modeling Language</p>
          <h2>UML gives the team a shared visual language.</h2>
          <p className="sdlc-chapter__description">UML is a standardized way to visualize software structure and behavior. Choose the diagram based on the question you need to answer—not because every project needs every diagram.</p>
          <div className="uml-workspace"><div className="uml-picker">{umlTypes.map(([name], index) => <button className={selectedUml === index ? "active" : ""} type="button" onClick={() => setSelectedUml(index)} key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong></button>)}</div><div className="uml-panel"><UmlDiagram type={umlTypes[selectedUml][0]} /><div><h3>{umlTypes[selectedUml][0]} diagram</h3><p>{umlTypes[selectedUml][1]}</p><strong>Usage:</strong> <span>{umlTypes[selectedUml][2]}</span></div></div></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-data-models">
        <div className="sdlc-chapter__content">
          <p className="section-label">Data and movement</p>
          <h2>Two diagrams. Two different questions.</h2>
          <p className="sdlc-chapter__description">A DFD follows information as it moves through a system. An ERD describes the data the system stores and the relationships between that data.</p>
          <div className="diagram-cards"><article><div className="diagram-heading"><span>01 / DFD</span><h3>How does information move?</h3></div><DfdDiagram /><p><strong>Usage:</strong> Identify external actors, processes, data stores, and the flows between them. Use it to clarify system boundaries and transformations.</p><small>Symbols: external entity, process, data flow, data store.</small></article><article><div className="diagram-heading"><span>02 / ERD</span><h3>What data exists and relates?</h3></div><ErdDiagram /><p><strong>Usage:</strong> Define entities, attributes, keys, and cardinality before designing database tables and relationships.</p><small>Symbols: entity, attribute, relationship, primary/foreign key.</small></article></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section sdlc-chapter__section--alt" id="sdlc-dfd-erd">
        <div className="sdlc-chapter__content">
          <p className="section-label">Compare the models</p>
          <h2>DFD vs. ERD at a glance.</h2>
          <div className="model-comparison"><div className="model-comparison__head"><span>Dimension</span><strong>DFD</strong><strong>ERD</strong></div>{[["Purpose", "Show how data moves", "Show how data is organized"], ["Objective", "Understand processing and boundaries", "Design a consistent data model"], ["Key components", "Entities, processes, flows, stores", "Entities, attributes, relationships, keys"], ["Symbols used", "Arrows, circles/processes, rectangles, open stores", "Boxes, lines, crow’s feet, key markers"], ["Rule", "Every process should have an input and an output", "Every relationship must have defined cardinality and keys"], ["Model", "Process-oriented / dynamic", "Data-oriented / structural"]].map(([label, dfd, erd]) => <div className="model-comparison__row" key={label}><span>{label}</span><p>{dfd}</p><p>{erd}</p></div>)}</div>
          <div className="sdlc-example"><strong>Key difference:</strong> A DFD can show a request moving from a student through a service into a database. An ERD shows the student and course records, their fields, and the relationship between them.</div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-nfr">
        <div className="sdlc-chapter__content">
          <p className="section-label">Quality attributes</p>
          <h2>Non-functional requirements define “how well.”</h2>
          <p className="sdlc-chapter__description">Functional requirements describe behavior. Non-functional requirements describe measurable qualities and constraints that shape architecture, technology choices, testing, and operations.</p>
          <div className="nfr-grid">{nfrs.map(([name, question, example]) => <article key={name}><span>{name}</span><h3>{question}</h3><p><strong>Example:</strong> {example}</p></article>)}</div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section sdlc-chapter__section--alt" id="sdlc-use-cases">
        <div className="sdlc-chapter__content">
          <p className="section-label">Behavioral design</p>
          <h2>Use cases make a requirement walkable.</h2>
          <p className="sdlc-chapter__description">A use case describes a goal from an actor’s point of view. It gives designers, developers, testers, and stakeholders a shared scenario to discuss before implementation.</p>
          <div className="use-case-picker" role="tablist" aria-label="Example use cases">{useCases.map((useCase, index) => <button className={selectedUseCase === index ? "active" : ""} type="button" role="tab" aria-selected={selectedUseCase === index} onClick={() => setSelectedUseCase(index)} key={useCase.name}><span>0{index + 1}</span><strong>{useCase.name}</strong><small>Actor: {useCase.actor}</small></button>)}</div>
          <div className="use-case-card" role="tabpanel"><div><span className="use-case-card__eyebrow">Primary actor / {useCases[selectedUseCase].actor}</span><h3>{useCases[selectedUseCase].name}</h3><p>{useCases[selectedUseCase].goal}</p><div className="use-case-meta"><div><strong>Precondition</strong><span>{useCases[selectedUseCase].preconditions}</span></div><div><strong>Alternate path</strong><span>{useCases[selectedUseCase].alternate}</span></div></div></div><ol>{useCases[selectedUseCase].flow.map((step, index) => <li key={step}><i>{String(index + 1).padStart(2, "0")}</i><span>{step}</span></li>)}</ol></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="sdlc-chapter__section" id="sdlc-mockups">
        <div className="sdlc-chapter__content">
          <p className="section-label">Interface design</p>
          <h2>Start with structure. Finish with confidence.</h2>
          <p className="sdlc-chapter__description">Mockups communicate the proposed interface before the product is built. Low fidelity answers “where does everything go?” High fidelity answers “what will the real experience feel like?”</p>
          <div className="mockup-grid"><article><div className="mockup-label"><span>01 / Low fidelity</span><strong>Structure before styling</strong></div><LowFidelityMockup /><p>Uses simple shapes and placeholders to test layout, hierarchy, navigation, and task flow without distracting decisions about color or branding.</p><small>Best for: early exploration, fast feedback, and inexpensive changes.</small></article><article><div className="mockup-label"><span>02 / High fidelity</span><strong>Experience before code</strong></div><HighFidelityMockup /><p>Represents the intended visual design with real content, typography, color, spacing, controls, and interaction details.</p><small>Best for: usability validation, stakeholder alignment, and implementation guidance.</small></article></div>
          <div className="sdlc-example"><strong>Design progression:</strong> Requirement → use case → low-fidelity flow → high-fidelity mockup → technical design → implementation and tests.</div>
        </div>
      </AnimatedSection>

    </div>
  );
}

export default SdlcChapter;
