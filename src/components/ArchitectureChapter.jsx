import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const patterns = [
  { name: "Observer", type: "Behavioral", plain: "One object announces a change; other objects get notified.", example: "A weather app updates several screens when the temperature changes.", code: "weather.subscribe(screen)\nweather.set_temperature(72)\n# screen receives the update" },
  { name: "Factory", type: "Creational", plain: "A separate method decides which object to create for you.", example: "A payment service creates a CardPayment or BankPayment without the caller knowing the details.", code: "payment = PaymentFactory.create(\"card\")\npayment.pay(25)" },
  { name: "Adapter", type: "Structural", plain: "A small wrapper makes an incompatible interface fit.", example: "Your app keeps its expected plug shape while an adapter connects a different charger.", code: "printer = OldPrinter()\nprinter_api = PrinterAdapter(printer)\nprinter_api.print(document)" },
  { name: "Strategy", type: "Behavioral", plain: "Swap an algorithm without rewriting the object that uses it.", example: "A checkout can switch between standard, express, or free shipping.", code: "cart.set_shipping(ExpressShipping())\ntotal = cart.total()" },
];

const domainPieces = [
  { name: "Entity", short: "Identity", definition: "A thing that stays the same thing because it has a unique ID, even if its details change.", example: "A student with ID 42 is still the same student after changing their email.", icon: "ID" },
  { name: "Value object", short: "Attributes", definition: "A small object defined only by its values. It usually does not need an ID and should not change after creation.", example: "Two Money(10, USD) objects are equal because their values match.", icon: "= =" },
  { name: "Aggregate", short: "Consistency", definition: "A group of related objects that must change together. Its root controls safe changes from the outside.", example: "An Order can contain OrderItems, but callers ask the Order to add an item.", icon: "◇" },
  { name: "Repository", short: "Storage", definition: "A simple doorway to save and retrieve domain objects without putting database code inside the business model.", example: "userRepository.find(42) hides whether users come from SQL, memory, or an API.", icon: "DB" },
  { name: "Domain service", short: "Coordination", definition: "Stateless business logic that does not naturally belong to one entity or value object.", example: "A currency conversion service uses two accounts and an exchange-rate provider.", icon: "→" },
  { name: "Bounded context", short: "Boundary", definition: "A clear boundary around a model. The word “customer” can mean different things in Sales and Shipping.", example: "Each context owns the meaning and rules that make sense for its part of the business.", icon: "[]" },
];

const orderItems = [
  { name: "Notebook", price: 12 },
  { name: "Pen set", price: 8 },
  { name: "Desk lamp", price: 35 },
];

const chapterTwoPatterns = [
  { category: "Creational", name: "Factory Method", summary: "Let a subclass decide which object gets created.", features: ["Moves creation decisions out of the main workflow", "Works with a shared product interface", "Makes it easier to add a new product type"], uses: ["Payment providers", "File exporters", "Notification channels"], example: "report = ReportFactory.create(\"pdf\")" },
  { category: "Creational", name: "Singleton", summary: "Allow only one shared instance of a class.", features: ["One controlled access point", "Shared state is easy to reach", "Creation is controlled by the class"], uses: ["Application configuration", "A logging coordinator", "A feature-flag registry"], example: "settings = AppSettings.instance()" },
  { category: "Structural", name: "Adapter", summary: "Translate one interface into the interface your code expects.", features: ["Connects incompatible classes", "Keeps legacy or third-party code isolated", "Uses a wrapper instead of rewriting the original"], uses: ["Old APIs", "Payment gateways", "Different vendor SDKs"], example: "printer = PrinterAdapter(old_printer)" },
  { category: "Structural", name: "Decorator", summary: "Wrap an object to add behavior without changing its class.", features: ["Adds responsibilities at runtime", "Decorators can be stacked", "Avoids many subclasses"], uses: ["Logging and caching", "Authorization checks", "Adding toppings to an order"], example: "service = Cached(Logged(UserService()))" },
  { category: "Structural", name: "Facade", summary: "Give a simple front door to a complicated subsystem.", features: ["Hides several moving parts", "Reduces dependencies for callers", "Creates a task-focused API"], uses: ["Checkout workflows", "Media conversion", "Cloud deployment helpers"], example: "video_facade.publish(video)" },
  { category: "Behavioral", name: "Iterator", summary: "Read items one at a time without exposing the collection’s internals.", features: ["Uses one traversal idea for many collections", "Protects the collection’s internal structure", "Supports lazy or large data sets"], uses: ["Paging through database results", "Walking a tree", "Reading a stream"], example: "for student in roster.iterator(): ..." },
  { category: "Behavioral", name: "Observer", summary: "Notify many interested objects when one object changes.", features: ["Creates one-to-many communication", "Observers can subscribe or unsubscribe", "Publisher does not need to know every screen"], uses: ["UI updates", "Event systems", "Email or forum notifications"], example: "news.subscribe(email_alerts)" },
  { category: "Behavioral", name: "Interpreter", summary: "Represent a small language and evaluate its instructions.", features: ["Defines grammar as objects or rules", "Turns text into behavior", "Useful for small domain-specific languages"], uses: ["Search filters", "Calculator expressions", "Rule engines"], example: "rule = And(IsMember(), HasCoupon())" },
  { category: "Behavioral", name: "Strategy", summary: "Swap an algorithm while keeping the object that uses it the same.", features: ["Encapsulates alternative algorithms", "Selects behavior at runtime", "Makes algorithms easier to test separately"], uses: ["Shipping prices", "Sorting choices", "Discount rules"], example: "cart.set_strategy(FreeShipping())" },
  { category: "Advanced", name: "MVC", summary: "Separate data and rules, the user interface, and input handling.", features: ["Model owns data and business rules", "View displays information", "Controller translates user actions"], uses: ["Web applications", "Desktop interfaces", "Mobile screens"], example: "Controller → Model → View" },
  { category: "Advanced", name: "Repository", summary: "Give the domain model a clean interface for data storage.", features: ["Hides SQL, API, or file details", "Makes business logic easier to test", "Provides a collection-like interface"], uses: ["User and order storage", "Switching databases", "In-memory test doubles"], example: "orders = order_repository.find_open()" },
];

const chapterTwoCategories = ["All", "Creational", "Structural", "Behavioral", "Advanced"];

const designDecisions = [
  { question: "Do I need to control object creation?", pattern: "Factory Method", decision: "Use a creation method when the calling code should work with a general product while a subclass chooses the concrete product.", consequence: "Adding a new product is easier, but the design introduces more classes and indirection." },
  { question: "Do several parts need one shared coordinator?", pattern: "Singleton", decision: "Use one controlled instance only when having multiple instances would create conflicting state or resources.", consequence: "Access is convenient, but hidden shared state can make testing and concurrency harder." },
  { question: "Do two parts have incompatible interfaces?", pattern: "Adapter", decision: "Wrap one class so the rest of the system can use the interface it already understands.", consequence: "Integration gets simpler, but the adapter becomes another boundary to maintain." },
  { question: "Will the algorithm or behavior change?", pattern: "Strategy", decision: "Move interchangeable behavior behind a shared interface and select it at runtime.", consequence: "Behavior is easier to test and extend, but callers must choose or receive a strategy." },
];

const abstractionModes = {
  abstract: { title: "The simple promise", description: "A PaymentProcessor promises that it can process a payment. The caller does not need to know whether the work uses a card, bank transfer, or digital wallet.", code: "processor.process(payment)" },
  concrete: { title: "The specific implementation", description: "Each subclass fills in the details behind the same method name. The outside code can stay stable while the implementation changes.", code: "class CardProcessor(PaymentProcessor):\n    def process(self, payment):\n        charge_card(payment)" },
};

const architecturePatterns = [
  { name: "Monolith", family: "One deployable", summary: "The application is built and deployed as one unit.", fit: "Small teams, early products, and systems where simple deployment matters.", strengths: ["Simple to develop and deploy", "Easy local communication", "Straightforward testing at first"], tradeoff: "As the system grows, modules can become tightly coupled and releases can become risky." },
  { name: "Microkernel", family: "Core + plug-ins", summary: "A small core provides the essentials while interchangeable plug-ins add capabilities.", fit: "Product platforms, IDEs, workflow tools, and systems that need optional features.", strengths: ["Flexible extension points", "Core stays focused", "Features can be added independently"], tradeoff: "Plugin contracts and version compatibility require careful design." },
  { name: "Message-based", family: "Communicating events", summary: "Components communicate by sending messages instead of calling each other directly.", fit: "Integrations, background work, event processing, and systems that need loose coupling.", strengths: ["Components can work independently", "Supports asynchronous work", "Messages can be retried or stored"], tradeoff: "Tracing a workflow and handling duplicates or out-of-order messages is harder." },
  { name: "Microservices", family: "Independent services", summary: "A system is split into services that own focused capabilities and can be deployed separately.", fit: "Large teams, independently scaling domains, and products with strong service boundaries.", strengths: ["Independent deployment and scaling", "Teams can own a service", "Failures can be isolated"], tradeoff: "Operations, networking, data consistency, and testing become more complex." },
  { name: "Reactive", family: "Responsive systems", summary: "The system is designed to stay responsive, resilient, message-driven, and elastic under change or load.", fit: "Real-time dashboards, high-volume services, and systems that must recover gracefully.", strengths: ["Responsive under load", "Resilient failure handling", "Can scale with demand"], tradeoff: "Requires asynchronous thinking, observability, and careful back-pressure handling." },
];

const architectureDrivers = [
  { driver: "Performance", question: "How fast must the system respond?", option: "Prefer caching, asynchronous work, or a reactive/message-based approach when waiting would hurt the user experience.", tradeoff: "Speed can add memory cost, stale data, or more moving parts." },
  { driver: "Maintainability", question: "How easily must teams change it?", option: "Prefer clear boundaries, a modular monolith, or focused services with explicit contracts.", tradeoff: "More boundaries require more design, testing, and coordination." },
  { driver: "Security", question: "What must be protected?", option: "Separate trust boundaries, minimize access, encrypt sensitive paths, and record important decisions.", tradeoff: "Security controls can add latency and development effort, but reduce business risk." },
  { driver: "Scalability", question: "What will grow independently?", option: "Separate the part that needs independent scaling and choose a data or messaging strategy that supports it.", tradeoff: "Distributed scaling introduces network failure and consistency concerns." },
];

const systemsViews = {
  reductionist: { label: "Reductionist view", title: "Fix the visible symptom", description: "A request is slow, so the team adds a faster database query. That may help, but it can miss the queue, network, dependency, or traffic pattern that created the delay.", steps: ["Slow request", "Tune one query", "Symptom may return"] },
  systems: { label: "Systems view", title: "Trace the relationships", description: "The team follows the request across users, services, queues, databases, and operational rules. They look for feedback loops and the conditions that keep recreating the problem.", steps: ["User request", "Service → queue → database", "Measure root cause + feedback"] },
};

const implementationStyles = [
  { name: "Client-server", question: "Does a client request a service from a central server?", fit: "Web apps, business systems, and APIs where a server owns shared data or rules.", strengths: ["Centralized security and data", "Clear request/response flow", "Easy to reason about initially"], watch: "The server can become a bottleneck or single point of failure." },
  { name: "Event-driven", question: "Does the system need to react to a stream of events?", fit: "Notifications, IoT, analytics, workflows, and high-volume asynchronous activity.", strengths: ["Loose coupling", "Handles bursts asynchronously", "New consumers can subscribe later"], watch: "Workflows are harder to trace and messages may arrive late or more than once." },
  { name: "Peer-to-peer", question: "Should participants communicate directly as equals?", fit: "File sharing, distributed collaboration, and networks without one central server.", strengths: ["No single central dependency", "Resources can be shared across peers", "Can continue when one peer leaves"], watch: "Discovery, trust, consistency, and coordination become more difficult." },
];

const cloudModels = [
  { name: "IaaS", control: "Most control", meaning: "Rent virtual machines, storage, and networking. Your team manages the operating system and applications.", use: "Lift-and-shift migrations or teams that need infrastructure-level control." },
  { name: "PaaS", control: "Balanced control", meaning: "Deploy your application while the provider manages much of the operating system and runtime platform.", use: "Teams that want to focus on code without maintaining servers." },
  { name: "SaaS", control: "Least control", meaning: "Use a complete software product managed by the provider, usually through a browser or API.", use: "Email, collaboration, CRM, and other finished business capabilities." },
];

const implementationSteps = [
  ["Requirements", "Clarify users, business goals, constraints, quality attributes, and cost limits."],
  ["Style", "Choose the architecture that best fits the request, event, data, deployment, and team context."],
  ["Model", "Use UML, ER diagrams, flowcharts, and boundaries to make the design discussable."],
  ["Prototype", "Build a small Python proof of concept to test the riskiest assumption early."],
  ["Implement", "Build, test, deploy, observe, and refine the solution as evidence arrives."],
];

const refactorViews = {
  before: { label: "Before", title: "The code works, but the job is hidden", code: "def checkout(items, member):\n    total = 0\n    for item in items:\n        total += item.price\n    if member:\n        total = total * 0.9\n    print(\"Total: $\" + str(total))", explanation: "One function calculates the total, applies a discount, and displays the result. A future change has to untangle all three responsibilities." },
  after: { label: "After", title: "The behavior stays the same; the responsibilities are clearer", code: "def calculate_total(items, member):\n    subtotal = sum(item.price for item in items)\n    return subtotal * 0.9 if member else subtotal\n\ndef checkout(items, member):\n    total = calculate_total(items, member)\n    print(f\"Total: ${total}\")", explanation: "The calculation has a name and can be tested by itself. The checkout function now coordinates the work instead of hiding every detail." },
};

function ArchitectureChapter() {
  const [oop, setOop] = useState("oop");
  const [pattern, setPattern] = useState(0);
  const [piece, setPiece] = useState(0);
  const [items, setItems] = useState([]);
  const [chapterTwoCategory, setChapterTwoCategory] = useState("All");
  const [chapterTwoPattern, setChapterTwoPattern] = useState(0);
  const [decision, setDecision] = useState(0);
  const [abstractionMode, setAbstractionMode] = useState("abstract");
  const [refactorView, setRefactorView] = useState("before");
  const [testResult, setTestResult] = useState(null);
  const [architecturePattern, setArchitecturePattern] = useState(0);
  const [architectureDriver, setArchitectureDriver] = useState(0);
  const [systemsView, setSystemsView] = useState("systems");
  const [implementationStyle, setImplementationStyle] = useState(0);
  const [cloudModel, setCloudModel] = useState(1);
  const activePattern = patterns[pattern];
  const activePiece = domainPieces[piece];
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const visibleChapterTwoPatterns = chapterTwoCategory === "All" ? chapterTwoPatterns : chapterTwoPatterns.filter((item) => item.category === chapterTwoCategory);
  const activeChapterTwoPattern = visibleChapterTwoPatterns[chapterTwoPattern] || visibleChapterTwoPatterns[0];

  return (
    <div className="architecture-chapter">
      <AnimatedSection className="architecture-chapter__intro" id="architecture">
        <div className="architecture-chapter__content architecture-hero-grid">
          <div>
            <p className="section-label">Software architecture + design / chapter 01</p>
            <h1>Make big software feel understandable.</h1>
            <p className="architecture-chapter__lede">Architecture is the big-picture shape of a system. Design is the set of choices that give each part a clear job. Patterns and domain-driven design help us make those choices repeatable.</p>
            <div className="architecture-chapter__callout"><strong>Plain-English goal</strong><span>Put the right responsibility in the right place, so the next change is easier to make.</span></div>
          </div>
          <div className="architecture-map" aria-label="Architecture map"><div className="architecture-map__core">SYSTEM</div><span className="architecture-map__node architecture-map__node--one">Rules</span><span className="architecture-map__node architecture-map__node--two">Data</span><span className="architecture-map__node architecture-map__node--three">Users</span><span className="architecture-map__node architecture-map__node--four">Code</span></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-oop">
        <div className="architecture-chapter__content">
          <p className="section-label">Start with the mental model</p>
          <h2>Procedural vs. object-oriented thinking.</h2>
          <p className="architecture-chapter__description">Both styles can work. The difference is what you organize first: a list of instructions, or objects that own data and behavior.</p>
          <div className="architecture-toggle" role="tablist" aria-label="Programming styles">{["procedural", "oop"].map((style) => <button className={oop === style ? "active" : ""} type="button" role="tab" aria-selected={oop === style} onClick={() => setOop(style)} key={style}>{style === "oop" ? "Object-oriented" : "Procedural"}</button>)}</div>
          <div className="architecture-style-card" role="tabpanel"><div className="architecture-style-card__visual"><span>{oop === "oop" ? "Order" : "step 1"}</span><i>→</i><span>{oop === "oop" ? "add_item()" : "step 2"}</span><i>→</i><span>{oop === "oop" ? "total()" : "step 3"}</span></div><div><span className="architecture-kicker">{oop === "oop" ? "Object-oriented" : "Procedural"}</span><h3>{oop === "oop" ? "Ask the object that owns the rule." : "Follow the instructions in order."}</h3><p>{oop === "oop" ? "An Order can protect its own items and calculate its own total. The rest of the program does not need to know every internal detail." : "A procedure is a sequence of commands that transforms data. This can be clear for small tasks, but shared data can become harder to protect as the program grows."}</p><code>{oop === "oop" ? "order.add_item(item)\norder.total()" : "items.append(item)\ntotal = sum(prices)"}</code></div></div>
          <p className="architecture-note"><strong>Remember:</strong> OOP is a tool, not a rule. Good design is about clear responsibilities, not using the most classes.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-patterns">
        <div className="architecture-chapter__content">
          <p className="section-label">Design patterns</p><h2>Reusable ideas for recurring problems.</h2><p className="architecture-chapter__description">A design pattern is not a copy-and-paste library. It is a named approach that gives a team a shared shortcut for talking about a design.</p>
          <div className="architecture-picker" role="tablist" aria-label="Design patterns">{patterns.map((item, index) => <button className={pattern === index ? "active" : ""} type="button" role="tab" aria-selected={pattern === index} onClick={() => setPattern(index)} key={item.name}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.type}</small></button>)}</div>
          <div className="architecture-pattern-card" role="tabpanel"><div><span className="architecture-kicker">{activePattern.type} pattern</span><h3>{activePattern.name}</h3><p>{activePattern.plain}</p><strong>Example</strong><p>{activePattern.example}</p></div><pre><code>{activePattern.code}</code></pre></div>
          <div className="architecture-pattern-map"><span>Creational<br /><small>How objects are made</small></span><span>Structural<br /><small>How parts fit together</small></span><span>Behavioral<br /><small>How parts communicate</small></span></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-ddd">
        <div className="architecture-chapter__content"><p className="section-label">Domain-driven design</p><h2>Name the business ideas before you code them.</h2><p className="architecture-chapter__description">DDD starts with the real-world problem. Instead of beginning with tables or screens, the team agrees on the important words, rules, and boundaries in the business domain.</p>
          <div className="domain-workspace"><div className="domain-picker">{domainPieces.map((item, index) => <button className={piece === index ? "active" : ""} type="button" onClick={() => setPiece(index)} key={item.name}><span>{item.icon}</span><strong>{item.name}</strong><small>{item.short}</small></button>)}</div><div className="domain-panel"><span className="architecture-kicker">DDD building block / {activePiece.short}</span><h3>{activePiece.name}</h3><p>{activePiece.definition}</p><div className="domain-example"><strong>Example</strong><span>{activePiece.example}</span></div></div></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-aggregate">
        <div className="architecture-chapter__content"><p className="section-label">Interactive lab / aggregate root</p><h2>Let the Order protect its own rules.</h2><p className="architecture-chapter__description">An aggregate is a small team of objects that must stay consistent. The aggregate root is the front door: other code asks it to make changes instead of editing its pieces directly.</p>
          <div className="aggregate-lab"><div className="aggregate-lab__order"><div className="aggregate-lab__header"><span>Aggregate root</span><strong>Order #1042</strong></div><div className="aggregate-lab__items">{items.length === 0 ? <p className="aggregate-empty">Choose an item to add it to the Order.</p> : items.map((item, index) => <div key={`${item.name}-${index}`}><span>{item.name}</span><strong>${item.price}</strong></div>)}</div><div className="aggregate-lab__total"><span>Order.total()</span><strong>${total}</strong></div></div><div className="aggregate-lab__controls"><span className="architecture-kicker">Call a safe method</span><h3>Order.add_item(item)</h3><p>The UI does not push directly into the Order’s internal list. It asks the root to add an item.</p>{orderItems.map((item) => <button type="button" onClick={() => setItems((current) => [...current, item])} key={item.name}><span>+ {item.name}</span><strong>${item.price}</strong></button>)}<button className="aggregate-clear" type="button" onClick={() => setItems([])}>Clear order</button></div></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-recap"><div className="architecture-chapter__content"><p className="section-label">Chapter recap</p><h2>Keep these six ideas close.</h2><div className="architecture-recap-grid">{["Architecture is the system’s big-picture shape.", "Design gives each part a clear responsibility.", "Patterns name solutions that teams see repeatedly.", "Entities have identity; value objects have values.", "Aggregates protect rules through an aggregate root.", "Repositories hide storage; bounded contexts protect meaning."].map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div><p className="architecture-note"><strong>Next step:</strong> When reading code, ask: “What business rule is this protecting, and which object should own it?”</p></div></AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--chapter-two" id="architecture-chapter2">
        <div className="architecture-chapter__content">
          <p className="section-label">Software design patterns / chapter 02 / selection of design patterns</p>
          <h2>Pattern recognition for everyday design problems.</h2>
          <p className="architecture-chapter__description">This chapter is a quick study reference. Pick a category, choose a pattern, and connect its key features to situations you may see in a real application.</p>
          <div className="chapter-two-categories" role="tablist" aria-label="Pattern categories">{chapterTwoCategories.map((category) => <button className={chapterTwoCategory === category ? "active" : ""} type="button" role="tab" aria-selected={chapterTwoCategory === category} onClick={() => { setChapterTwoCategory(category); setChapterTwoPattern(0); }} key={category}>{category}</button>)}</div>
          <div className="chapter-two-picker" role="tablist" aria-label="Chapter two patterns">{visibleChapterTwoPatterns.map((item, index) => <button className={activeChapterTwoPattern.name === item.name ? "active" : ""} type="button" role="tab" aria-selected={activeChapterTwoPattern.name === item.name} onClick={() => setChapterTwoPattern(index)} key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><small>{item.category}</small></button>)}</div>
          <div className="chapter-two-card" role="tabpanel"><div className="chapter-two-card__intro"><span className="architecture-kicker">{activeChapterTwoPattern.category} pattern</span><h3>{activeChapterTwoPattern.name}</h3><p>{activeChapterTwoPattern.summary}</p><code>{activeChapterTwoPattern.example}</code></div><div className="chapter-two-card__details"><div><strong>Key features</strong><ul>{activeChapterTwoPattern.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div><strong>Common use cases</strong><ul>{activeChapterTwoPattern.uses.map((use) => <li key={use}>{use}</li>)}</ul></div></div></div>
          <div className="chapter-two-memory"><strong>Memory trick</strong><span>Creational = make it · Structural = fit it together · Behavioral = make it communicate · Advanced = organize a whole application concern</span></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-decisions">
        <div className="architecture-chapter__content">
          <p className="section-label">Chapter 2 / Part 2</p>
          <h2>Design patterns are decisions, not decorations.</h2>
          <p className="architecture-chapter__description">A pattern explains a problem, a reusable solution, and the trade-offs that come with it. Choose a pattern because it makes a real design pressure easier to manage—not because the name sounds impressive.</p>
          <div className="decision-picker" role="tablist" aria-label="Design pattern decisions">{designDecisions.map((item, index) => <button className={decision === index ? "active" : ""} type="button" role="tab" aria-selected={decision === index} onClick={() => setDecision(index)} key={item.pattern}><span>0{index + 1}</span><strong>{item.pattern}</strong><small>{item.question}</small></button>)}</div>
          <div className="decision-card" role="tabpanel"><div><span className="architecture-kicker">Problem to solve</span><h3>{designDecisions[decision].question}</h3><p>{designDecisions[decision].decision}</p></div><div className="decision-card__consequence"><span className="architecture-kicker">Consequence</span><p>{designDecisions[decision].consequence}</p><div className="decision-flow"><b>Problem</b><i>→</i><b>Pattern</b><i>→</i><b>Trade-off</b></div></div></div>
          <div className="architecture-note"><strong>Study prompt:</strong> Before naming a pattern, describe the problem in one sentence. If there is no clear problem, you may be adding complexity instead of removing it.</div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-abstraction">
        <div className="architecture-chapter__content">
          <p className="section-label">Design abstraction</p>
          <h2>Hide the details that callers do not need.</h2>
          <p className="architecture-chapter__description">Abstraction gives the rest of the system a useful promise while keeping implementation details behind a boundary. In object-oriented programming, a superclass can define the shared idea and subclasses can provide the specific behavior.</p>
          <div className="abstraction-toggle" role="tablist" aria-label="Abstraction layers">{[["abstract", "1 / Promise"], ["concrete", "2 / Implementation"]].map(([mode, label]) => <button className={abstractionMode === mode ? "active" : ""} type="button" role="tab" aria-selected={abstractionMode === mode} onClick={() => setAbstractionMode(mode)} key={mode}>{label}</button>)}</div>
          <div className="abstraction-card" role="tabpanel"><div className="abstraction-card__diagram"><span className={abstractionMode === "abstract" ? "active" : ""}>PaymentProcessor</span><i>↓</i><span className={abstractionMode === "concrete" ? "active" : ""}>CardProcessor</span><span>BankProcessor</span></div><div><span className="architecture-kicker">{abstractionModes[abstractionMode].title}</span><h3>{abstractionMode === "abstract" ? "Use the same door." : "Change what is behind the door."}</h3><p>{abstractionModes[abstractionMode].description}</p><code>{abstractionModes[abstractionMode].code}</code></div></div>
          <div className="chaos-order"><div><span>Antipattern</span><h3>Big ball of mud</h3><p>Everything becomes connected to everything else. A small change can create surprising effects.</p></div><div className="chaos-order__arrow">→</div><div><span>Design goal</span><h3>Structured complexity</h3><p>Parts may still be sophisticated, but their boundaries and responsibilities are understandable.</p></div></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-refactoring">
        <div className="architecture-chapter__content">
          <p className="section-label">Software architecture + design / chapter 03</p>
          <h2>Refactor the shape. Keep the behavior.</h2>
          <p className="architecture-chapter__description">Refactoring is improving the inside of software without changing what users see from the outside. It is routine maintenance: make the code easier to understand now so the next change costs less.</p>
          <div className="refactor-toggle" role="tablist" aria-label="Refactoring example">{[["before", "01 / Before"], ["after", "02 / After"]].map(([view, label]) => <button className={refactorView === view ? "active" : ""} type="button" role="tab" aria-selected={refactorView === view} onClick={() => { setRefactorView(view); setTestResult(null); }} key={view}>{label}</button>)}</div>
          <div className="refactor-workspace" role="tabpanel"><div className="refactor-code"><div className="refactor-code__bar"><span>checkout.py</span><span>{refactorViews[refactorView].label}</span></div><pre><code>{refactorViews[refactorView].code}</code></pre></div><div className="refactor-explanation"><span className="architecture-kicker">{refactorViews[refactorView].label}</span><h3>{refactorViews[refactorView].title}</h3><p>{refactorViews[refactorView].explanation}</p><button className="test-button" type="button" onClick={() => setTestResult(refactorView === "after" ? "passed" : "warning")}>{testResult === "passed" ? "✓ Tests passed" : testResult === "warning" ? "⚠ Add tests before changing this" : "Run behavior check"}</button><small>The goal of a refactor is not a new result. It is a safer, clearer path to the same result.</small></div></div>
          <div className="refactor-techniques"><article><span>01</span><strong>Rename</strong><p>Use a name that explains what the variable, function, or class represents.</p></article><article><span>02</span><strong>Extract</strong><p>Move one responsibility into a small, focused method or function.</p></article><article><span>03</span><strong>Remove</strong><p>Delete duplication, dead code, and steps that no longer add value.</p></article><article><span>04</span><strong>Test</strong><p>Run unit tests before and after so the original behavior has evidence behind it.</p></article></div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-maintenance">
        <div className="architecture-chapter__content"><p className="section-label">Part 3 / maintaining software</p><h2>Small cleanups prevent large knots.</h2><p className="architecture-chapter__description">Technical debt is the extra cost created when shortcuts make future work harder. Refactoring is how a team steadily pays that cost down while the product continues moving forward.</p><div className="maintenance-loop"><div><span>Notice</span><strong>Code is hard to change</strong><p>Duplication, long methods, unclear names, and tangled dependencies are signals.</p></div><i>→</i><div><span>Protect</span><strong>Run the tests</strong><p>Tests establish the behavior that must remain true during the cleanup.</p></div><i>→</i><div><span>Improve</span><strong>Make one small change</strong><p>Refactor in steps, run checks, and keep the code in a working state.</p></div><i>→</i><div><span>Repeat</span><strong>Keep the design healthy</strong><p>Regular maintenance keeps future features cheaper and safer.</p></div></div><div className="architecture-note"><strong>Key idea:</strong> Refactoring is not rewriting everything. It is a series of small, behavior-preserving improvements.</div></div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-analysis">
        <div className="architecture-chapter__content">
          <p className="section-label">Software architecture analysis / chapter 03 / part 1</p>
          <h2>Use diagrams to ask better questions.</h2>
          <p className="architecture-chapter__description">Architecture analysis turns a system into models people can discuss. UML class diagrams focus on software structure and relationships. ER diagrams focus on the data a system stores and how those records relate.</p>
          <div className="analysis-diagram-grid"><article><div className="analysis-card__heading"><span>01 / UML class diagram</span><h3>What objects and responsibilities exist?</h3></div><div className="uml-mini"><div><strong>Order</strong><span>- orderId</span><span>+ addItem()</span></div><i>◇</i><div><strong>OrderItem</strong><span>- quantity</span><span>+ total()</span></div></div><p><strong>Shows:</strong> classes, attributes, methods, and relationships. UML can also model behavior through activity, interaction, state machine, and use case diagrams.</p><small>Use it to discuss object-oriented structure before implementation.</small></article><article><div className="analysis-card__heading"><span>02 / ER diagram</span><h3>What data is stored and related?</h3></div><div className="erd-mini"><div><strong>STUDENT</strong><span><u>student_id</u></span><span>name</span></div><i>1 ──── N</i><div><strong>ENROLLMENT</strong><span><u>enrollment_id</u></span><span>course_id</span></div></div><p><strong>Shows:</strong> entities, attributes, primary keys, and relationship cardinality. Required fields can be emphasized, and primary keys are commonly underlined.</p><small>Use it to reason about database structure and data integrity.</small></article></div>
          <div className="architecture-note"><strong>Quick distinction:</strong> UML class diagrams describe software objects and behavior. ER diagrams describe stored data and relationships. They can describe related ideas, but they answer different questions.</div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-patterns-analysis">
        <div className="architecture-chapter__content"><p className="section-label">Chapter 03 / part 2</p><h2>Zoom out from design patterns to architecture patterns.</h2><p className="architecture-chapter__description">A design pattern usually solves a local code problem. An architectural pattern organizes the shape of the whole system. A microservices architecture might use Observer inside one service and Repository at its data boundary.</p><div className="architecture-analysis-picker" role="tablist" aria-label="Architecture patterns">{architecturePatterns.map((item, index) => <button className={architecturePattern === index ? "active" : ""} type="button" role="tab" aria-selected={architecturePattern === index} onClick={() => setArchitecturePattern(index)} key={item.name}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.family}</small></button>)}</div><div className="architecture-analysis-card" role="tabpanel"><div><span className="architecture-kicker">{architecturePatterns[architecturePattern].family}</span><h3>{architecturePatterns[architecturePattern].name}</h3><p>{architecturePatterns[architecturePattern].summary}</p><strong>Common fit</strong><p>{architecturePatterns[architecturePattern].fit}</p></div><div><strong>Strengths</strong><ul>{architecturePatterns[architecturePattern].strengths.map((item) => <li key={item}>{item}</li>)}</ul><strong>Trade-off</strong><p>{architecturePatterns[architecturePattern].tradeoff}</p></div></div><div className="architecture-level-map"><span>Architecture pattern<br /><small>System organization</small></span><i>contains</i><span>Design pattern<br /><small>Component-level solution</small></span></div></div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-decisions-analysis">
        <div className="architecture-chapter__content"><p className="section-label">Chapter 03 / part 3 / architectural decisions</p><h2>Let business needs drive the architecture.</h2><p className="architecture-chapter__description">Attribute-driven design starts with the qualities the system must have—such as performance, security, maintainability, or scalability. Those quality attributes become drivers for comparing architecture options.</p><div className="driver-picker" role="tablist" aria-label="Architecture decision drivers">{architectureDrivers.map((item, index) => <button className={architectureDriver === index ? "active" : ""} type="button" role="tab" aria-selected={architectureDriver === index} onClick={() => setArchitectureDriver(index)} key={item.driver}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.driver}</strong><small>{item.question}</small></button>)}</div><div className="driver-card" role="tabpanel"><div><span className="architecture-kicker">Quality attribute / {architectureDrivers[architectureDriver].driver}</span><h3>{architectureDrivers[architectureDriver].question}</h3><p>{architectureDrivers[architectureDriver].option}</p></div><div className="driver-card__tradeoff"><span className="architecture-kicker">Trade-off analysis</span><p>{architectureDrivers[architectureDriver].tradeoff}</p><div className="driver-tree"><b>Business need</b><i>→</i><b>Architecture choice</b><i>→</i><b>Consequence</b></div></div></div><p className="architecture-note"><strong>Decision habit:</strong> Record the driver, the options considered, the reason for the choice, and the consequences the team accepts. A good architecture supports business value today and leaves room for tomorrow.</p></div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-systems-thinking">
        <div className="architecture-chapter__content">
          <p className="section-label">Chapter 03 / part 4 / systems thinking</p>
          <h2>See the relationships, not just the component.</h2>
          <p className="architecture-chapter__description">Systems thinking treats software as a connected system of people, code, data, infrastructure, policies, and feedback. The goal is not to ignore individual parts—it is to understand how their relationships create the behavior we observe.</p>
          <div className="systems-toggle" role="tablist" aria-label="Systems thinking views">{[["reductionist", "Reductionist view"], ["systems", "Systems view"]].map(([view, label]) => <button className={systemsView === view ? "active" : ""} type="button" role="tab" aria-selected={systemsView === view} onClick={() => setSystemsView(view)} key={view}>{label}</button>)}</div>
          <div className="systems-card" role="tabpanel"><div className="systems-card__map">{systemsViews[systemsView].steps.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < systemsViews[systemsView].steps.length - 1 && <i>→</i>}</div>)}</div><div><span className="architecture-kicker">{systemsViews[systemsView].label}</span><h3>{systemsViews[systemsView].title}</h3><p>{systemsViews[systemsView].description}</p></div></div>
          <div className="systems-practice"><span className="architecture-kicker">Practice the habit</span><div className="systems-practice__grid"><article><strong>1 / Ask what connects</strong><p>Which users, services, data stores, teams, policies, and external systems affect this behavior?</p></article><article><strong>2 / Look for feedback</strong><p>Could a delay, retry, alert, or workaround make the next failure more likely?</p></article><article><strong>3 / Find leverage</strong><p>Where could a small change improve the behavior of several connected parts?</p></article><article><strong>4 / Update the mental model</strong><p>Use diagrams, evidence, and experience to replace assumptions that no longer match reality.</p></article></div></div>
          <div className="architecture-note"><strong>Key idea:</strong> Systems thinking is a practice. It grows through active participation, observation, abstraction, and repeated reflection—not through memorizing one diagram.</div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-implementation">
        <div className="architecture-chapter__content"><p className="section-label">Implementing architecture + design / chapter 04 / part 1</p><h2>Turn requirements into an architecture you can build.</h2><p className="architecture-chapter__description">Implementation starts with requirements, not technology fashion. Consider performance, scalability, maintainability, security, team capability, deployment constraints, and cost before choosing a style.</p><div className="implementation-steps">{implementationSteps.map(([name, description], index) => <div key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{description}</p>{index < implementationSteps.length - 1 && <i>→</i>}</div>)}</div><div className="style-analysis-picker" role="tablist" aria-label="Architectural styles">{implementationStyles.map((style, index) => <button className={implementationStyle === index ? "active" : ""} type="button" role="tab" aria-selected={implementationStyle === index} onClick={() => setImplementationStyle(index)} key={style.name}><span>0{index + 1}</span><strong>{style.name}</strong><small>{style.question}</small></button>)}</div><div className="style-analysis-card" role="tabpanel"><div><span className="architecture-kicker">Architectural style / {implementationStyles[implementationStyle].name}</span><h3>{implementationStyles[implementationStyle].question}</h3><p>{implementationStyles[implementationStyle].fit}</p></div><div><strong>Strengths</strong><ul>{implementationStyles[implementationStyle].strengths.map((item) => <li key={item}>{item}</li>)}</ul><strong>Watch for</strong><p>{implementationStyles[implementationStyle].watch}</p></div></div></div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section architecture-chapter__section--alt" id="architecture-deployment">
        <div className="architecture-chapter__content"><p className="section-label">Chapter 04 / deployment choices</p><h2>Choose where the system should live.</h2><p className="architecture-chapter__description">On-premise deployment keeps hardware and data inside the organization’s boundaries. Cloud models trade some control for provider-managed infrastructure and faster access to capacity.</p><div className="deployment-comparison"><div><span className="architecture-kicker">On-premise</span><h3>Control your environment.</h3><div className="deployment-pros"><strong>Pros</strong><p>Control, security boundaries, customization, and easier support for some compliance requirements.</p></div><div className="deployment-cons"><strong>Cons</strong><p>High upfront cost, limited elasticity, ongoing maintenance, dedicated staff, and more difficult disaster recovery.</p></div></div><div><span className="architecture-kicker">Cloud service models</span><h3>Choose your level of control.</h3><div className="cloud-picker" role="tablist" aria-label="Cloud service models">{cloudModels.map((model, index) => <button className={cloudModel === index ? "active" : ""} type="button" role="tab" aria-selected={cloudModel === index} onClick={() => setCloudModel(index)} key={model.name}><strong>{model.name}</strong><small>{model.control}</small></button>)}</div><div className="cloud-detail" role="tabpanel"><strong>{cloudModels[cloudModel].name} / {cloudModels[cloudModel].control}</strong><p>{cloudModels[cloudModel].meaning}</p><small>{cloudModels[cloudModel].use}</small></div></div></div><div className="control-spectrum"><span>More control</span><i>IaaS</i><i>PaaS</i><i>SaaS</i><span>More provider responsibility</span></div></div>
      </AnimatedSection>

      <AnimatedSection className="architecture-chapter__section" id="architecture-modeling-prototype">
        <div className="architecture-chapter__content"><p className="section-label">Chapter 04 / modeling and prototyping</p><h2>Make the design visible before the build gets expensive.</h2><p className="architecture-chapter__description">UML and ER diagrams help a team discuss structure. Flowcharts clarify workflow. CASE tools organize models and shared knowledge. A small Python prototype tests whether an idea works before the team invests in a full implementation.</p><div className="modeling-tool-grid"><article><span>01 / UML</span><h3>Model structure and behavior.</h3><p>Use class, sequence, activity, state, use case, component, and deployment diagrams to answer different design questions.</p><code>Requirement → use case → class / sequence model</code></article><article><span>02 / Flowchart</span><h3>Map the workflow.</h3><p>Show inputs, decisions, actions, alternate paths, and outputs before turning the flow into code.</p><code>Input → decision → action → result</code></article><article><span>03 / Python prototype</span><h3>Test the riskiest idea.</h3><p>Build a narrow functional slice: accept input, simulate behavior, display output, and observe what needs refinement.</p><code>prototype.run(sample_input)</code></article></div><div className="implementation-pipeline"><span>Requirements</span><i>→</i><span>Model</span><i>→</i><span>Prototype</span><i>→</i><span>Test</span><i>→</i><span>Implement</span><i>→</i><span>Deploy + learn</span></div><div className="architecture-note"><strong>Implementation principle:</strong> A prototype is not throwaway failure. It is a low-cost question: “What should we learn before we commit to the full architecture?”</div></div>
      </AnimatedSection>
    </div>
  );
}

export default ArchitectureChapter;
