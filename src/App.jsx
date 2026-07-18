import Hero from "./components/Hero";
import BigOIntro from "./components/BigOIntro";
import ComplexityComparison from "./components/ComplexityComparison";
import ComplexityList from "./components/ComplexityList";
import BigOGraph from "./components/BigOGraph";
import GsapEffects from "./components/GsapEffects";
import DataStructureComplexity from "./components/DataStructureComplexity";
import SearchSortComplexity from "./components/SearchSortComplexity";
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
    </main>
  );
}

export default App;
