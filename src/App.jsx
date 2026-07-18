import Hero from "./components/Hero";
import BigOIntro from "./components/BigOIntro";
import ComplexityComparison from "./components/ComplexityComparison";
import ComplexityList from "./components/ComplexityList";
import BigOGraph from "./components/BigOGraph";
import GsapEffects from "./components/GsapEffects";
import DataStructureComplexity from "./components/DataStructureComplexity";
import SearchSortComplexity from "./components/SearchSortComplexity";
import SortingByStructure from "./components/SortingByStructure";
import "./App.css";

function App() {
  return (
    <main>
      <GsapEffects />
      <Hero />
      <BigOIntro />
      <ComplexityComparison />
      <ComplexityList />
      <BigOGraph />
      <DataStructureComplexity />
      <SearchSortComplexity />
      <SortingByStructure />
    </main>
  );
}

export default App;
