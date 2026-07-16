import Hero from "./components/Hero";
import BigOIntro from "./components/BigOIntro";
import ComplexityComparison from "./components/ComplexityComparison";
import ComplexityList from "./components/ComplexityList";
import "./App.css";

function App() {
  return (
    <main>
      <Hero />
      <BigOIntro />
      <ComplexityComparison />
      <ComplexityList />
    </main>
  );
}

export default App;