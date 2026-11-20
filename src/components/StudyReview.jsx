import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const reviewContent = {
  dsa: {
    label: "Data structures + algorithms",
    objectives: ["Explain Big O as a way to discuss growth", "Choose a structure based on access, update, and memory needs", "Compare search and sorting approaches", "Connect an implementation choice to a real use case"],
    definitions: [["Big O", "A way to describe how work grows. Technical: an asymptotic analysis of time or space as input size increases."], ["Data structure", "A way to organize data. Technical: a representation that defines how data is stored, accessed, updated, and traversed."], ["Algorithm", "A repeatable recipe for solving a problem. Technical: a finite sequence of well-defined steps that transforms input into output."], ["Index", "A shortcut that helps find stored data. Technical: an auxiliary structure that trades storage and write cost for faster lookup."]],
    questions: [["You need fast lookup by a unique key. What should you consider first?", "A hash table or database index is a strong candidate because it is designed for key-based lookup. Check memory, ordering, update cost, and expected workload before choosing."], ["Why can a theoretically faster algorithm still be the wrong choice?", "Real data size, constant factors, memory use, implementation complexity, and the actual workload all matter. Big O is a useful signal, not the entire decision."], ["What should a code review ask about a new data structure?", "Ask which operations matter most, their expected complexity, how memory changes, and whether the structure makes the code clearer or harder to maintain."]],
  },
  sdlc: {
    label: "Software development life cycle",
    objectives: ["Describe how requirements become a delivered product", "Choose a development approach that fits uncertainty and constraints", "Distinguish functional and non-functional requirements", "Plan testing, deployment, measurement, and feedback"],
    definitions: [["Requirement", "Something the product must satisfy. Technical: a documented, testable need or constraint from a stakeholder, user, business, or regulation."], ["Functional requirement", "What the system does. Technical: observable behavior or capability the system must provide."], ["Non-functional requirement", "How well the system does it. Technical: a measurable quality attribute or constraint such as performance, security, or availability."], ["Acceptance test", "A check that the customer’s need is met. Technical: a business-facing verification that agreed acceptance criteria are satisfied."]],
    questions: [["When is Agile a better fit than a strictly sequential approach?", "Agile is useful when requirements are uncertain or expected to change and frequent feedback can reduce risk. It still needs direction, quality practices, and prioritization."], ["What is the difference between QA and testing?", "Testing is the act of evaluating software. Quality assurance is the broader practice of preventing defects, improving the process, and building confidence throughout delivery."], ["What makes a requirement testable?", "It has clear behavior, context, data, and a pass condition that two people can interpret consistently and verify with a repeatable check."]],
  },
  architecture: {
    label: "Software architecture + design",
    objectives: ["Explain the difference between design and architecture patterns", "Select a pattern based on a problem and its trade-offs", "Use UML and ER diagrams to communicate different models", "Connect architecture decisions to business drivers and quality attributes"],
    definitions: [["Design pattern", "A named solution to a recurring code problem. Technical: a reusable design approach for responsibilities and collaboration among software components."], ["Architecture pattern", "A shape for the whole system. Technical: a high-level organization of components, communication, deployment, and responsibility boundaries."], ["Abstraction", "Show the useful promise and hide unnecessary details. Technical: expose essential behavior through a stable interface while encapsulating implementation."], ["Quality attribute", "How well the system must work. Technical: a measurable characteristic such as performance, security, maintainability, reliability, or scalability."]],
    questions: [["What should you write down before choosing a pattern?", "Write the problem, constraints, options considered, selected solution, and consequences the team accepts. The pattern name comes after the problem is clear."], ["When should you use a UML class diagram instead of an ER diagram?", "Use a class diagram for software objects, attributes, methods, and relationships. Use an ER diagram for stored data, keys, and database relationships."], ["Why is a simple monolith sometimes better than microservices?", "A monolith can reduce operational and communication complexity when the team or product is small. Microservices are useful when boundaries, ownership, deployment, or scaling needs justify the extra cost."]],
  },
};

function StudyReview({ topic }) {
  const content = reviewContent[topic];
  const [tab, setTab] = useState("objectives");
  const [question, setQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!content) return null;

  return (
    <AnimatedSection className="study-review" id={`${topic}-study`}>
      <div className="study-review__content">
        <p className="section-label">Study review / {content.label}</p>
        <h2>Turn reading into recall.</h2>
        <p className="study-review__description">Use this quick review after the chapter. First explain the idea in your own words, then check the technical version and answer a scenario question.</p>
        <div className="study-review__tabs" role="tablist" aria-label="Study review sections">{[["objectives", "Objectives"], ["definitions", "Glossary"], ["questions", "Review questions"]].map(([id, label]) => <button className={tab === id ? "active" : ""} type="button" role="tab" aria-selected={tab === id} onClick={() => { setTab(id); setShowAnswer(false); }} key={id}>{label}</button>)}</div>
        {tab === "objectives" && <div className="study-review__objectives" role="tabpanel">{content.objectives.map((objective, index) => <article key={objective}><span>0{index + 1}</span><p>{objective}</p></article>)}</div>}
        {tab === "definitions" && <div className="study-review__definitions" role="tabpanel">{content.definitions.map(([term, definition]) => { const [simple, technical] = definition.split(" Technical: "); return <article key={term}><h3>{term}</h3><p><strong>Simple:</strong> {simple}</p><p><strong>Technical:</strong> {technical}</p></article>; })}</div>}
        {tab === "questions" && <div className="study-review__question" role="tabpanel"><div className="study-review__question-picker">{content.questions.map(([prompt], index) => <button className={question === index ? "active" : ""} type="button" onClick={() => { setQuestion(index); setShowAnswer(false); }} key={prompt}>Question {index + 1}</button>)}</div><div className="study-review__question-card"><span>Question {question + 1} of {content.questions.length}</span><h3>{content.questions[question][0]}</h3><button type="button" onClick={() => setShowAnswer((value) => !value)}>{showAnswer ? "Hide explanation" : "Show explanation"}</button>{showAnswer && <p><strong>Explanation:</strong> {content.questions[question][1]}</p>}</div></div>}
      </div>
    </AnimatedSection>
  );
}

export default StudyReview;
