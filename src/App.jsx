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
import "./App.css";

function App() {
  return (
    <main>
      <GsapEffects />
      <Navigation />
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
    </main>
  );
}

export default App;
