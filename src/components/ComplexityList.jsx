import complexityData from "../data/complexityData";
import ComplexityCard from "./ComplexityCard";

function ComplexityList() {
  return (
    <section className="complexity-list">
      <div className="complexity-list__content">
        <p className="section-label">Common Growth Rates</p>

        <h2>Seven common Big O complexities</h2>

        <p className="complexity-list__description">
          Each complexity describes a different pattern of growth. Faster
          growth means the algorithm requires much more work as the input
          becomes larger.
        </p>

        <div className="complexity-list__grid">
          {complexityData.map((complexity, index) => (
            <ComplexityCard
              key={complexity.id}
              notation={complexity.notation}
              name={complexity.name}
              rating={complexity.rating}
              definition={complexity.definition}
              example={complexity.example}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComplexityList;