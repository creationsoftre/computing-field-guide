import { useState } from "react";
import Hero from "./components/Hero";
import BigOIntro from "./components/BigOIntro";
import ComplexityComparison from "./components/ComplexityComparison";
import ComplexityList from "./components/ComplexityList";
import BigOGraph from "./components/BigOGraph";
import GsapEffects from "./components/GsapEffects";
import DataStructureComplexity from "./components/DataStructureComplexity";
import SearchSortComplexity from "./components/SearchSortComplexity";
import SortingByStructure from "./components/SortingByStructure";
import StructuresByLanguage from "./components/StructuresByLanguage";
import ImplementationLab from "./components/ImplementationLab";
import DataStructureGuide from "./components/DataStructureGuide";
import DatabaseRelationships from "./components/DatabaseRelationships";
import Navigation from "./components/Navigation";
import SdlcChapter from "./components/SdlcChapter";
import TopicLanding from "./components/TopicLanding";
import "./App.css";

function App() {
  const [topic, setTopic] = useState(null);

  if (!topic) return <TopicLanding onSelect={setTopic} />;

  const selectTopic = (nextTopic) => setTopic(nextTopic);

  return (
    <main>
      <GsapEffects />
      <Navigation topic={topic} onHome={() => selectTopic(null)} />
      {topic === "dsa" ? (
        <>
          <Hero />
          <BigOIntro />
          <ComplexityComparison />
          <ComplexityList />
          <BigOGraph />
          <DataStructureComplexity />
          <DataStructureGuide />
          <StructuresByLanguage />
          <ImplementationLab />
          <SearchSortComplexity category="search" />
          <SearchSortComplexity category="sort" />
          <SortingByStructure />
          <DatabaseRelationships />
        </>
      ) : <SdlcChapter />}
    </main>
  );
}

export default App;
