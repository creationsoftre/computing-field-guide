import Hero from "./components/Hero";
import BigOIntro from "./components/BigOIntro";
import ComplexityComparison from "./components/ComplexityComparison";
import ComplexityList from "./components/ComplexityList";
import BigOGraph from "./components/BigOGraph";
import GsapEffects from "./components/GsapEffects";
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
    </main>
  );
}

export default App;
