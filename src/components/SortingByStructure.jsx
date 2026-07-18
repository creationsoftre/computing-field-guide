import sortingByStructureData from "../data/SortingByStructureData";
import AnimatedSection from "./AnimatedSection";

function SortingByStructure() {
  return (
    <AnimatedSection className="sorting-structures">
      <div className="sorting-structures__content">
        <p className="section-label">Choose for the container</p>
        <h2>Sorting algorithms by data structure</h2>
        <p className="sorting-structures__description">
          An algorithm can be mathematically efficient and still be a poor fit
          for its container. Index access, traversal direction, and existing
          ordering determine which strategy works naturally.
        </p>

        <div className="sorting-structures__table-wrap">
          <table className="sorting-structures__table">
            <thead>
              <tr>
                <th scope="col">Data structure</th>
                <th scope="col">Suitable sorting algorithms</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {sortingByStructureData.map((item) => (
                <tr key={item.structure}>
                  <th scope="row">{item.structure}</th>
                  <td>
                    <div className="sorting-structures__tags">
                      {item.algorithms.map((algorithm) => (
                        <span className="sorting-structures__tag" key={algorithm}>
                          {algorithm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="sorting-structures__footnote">
          Each pill is a suitable option, but the best choice still depends on
          input size, existing order, stability needs, and available memory.
          Tree traversal emits sorted values; it does not rearrange the tree itself.
        </p>
      </div>
    </AnimatedSection>
  );
}

export default SortingByStructure;
