import "./ChartsSection.css";

import PieChartCard from "./PieChartCard";
import LineChartCard from "./LineChartCard";

const ChartsSection = ({ summary }) => {

  console.log("PieChart Summary:", summary);
  return (

    
    <section className="charts-section">

      <PieChartCard summary={summary} />

      <LineChartCard />

    </section>
  );
};

export default ChartsSection;