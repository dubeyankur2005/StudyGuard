import "./TopSubjects.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#14B8A6",
  "#6366F1",
  "#F59E0B",
  "#EC4899",
  "#3B82F6",
];

const TopSubjects = ({ subjects = null }) => {
  const classifiableSubjects = subjects?.filter((item) => item.name !== "Unclassified") || [];
  const hasDistribution = classifiableSubjects.length > 0;
  return (
    <section className="top-subjects">

      <div className="section-header">
        <h3>Top Subjects</h3>
      </div>

      <div className="subjects-container">

        {subjects === null ? <p className="subjects-empty" role="status">Loading subject history...</p> : !hasDistribution ? (
          <div className="subjects-empty" role="status">
            <strong>No classifiable subjects yet</strong>
            <span>{subjects.length ? `${subjects.find((item) => item.name === "Unclassified")?.count || 0} study videos could not be classified from their titles.` : "Study video history will appear here once available."}</span>
          </div>
        ) : <>
        <div className="subject-chart">

          <ResponsiveContainer width="100%" height={220}>

            <PieChart>

              <Pie
                data={subjects}
                dataKey="percentage"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
              >

                {subjects.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip formatter={(value) => [`${value}%`, "Study videos"]} />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="subject-list">

          {subjects.map((item, index) => (

            <div
              className="subject-item"
              key={item.name}
            >

              <span
                className="color-dot"
                style={{
                  background: COLORS[index % COLORS.length],
                }}
              ></span>

              <span className="subject-name">
                {item.name}
              </span>

              <span className="subject-value">
                {item.percentage}% <span className="subject-count">({item.count})</span>
              </span>

            </div>

          ))}

        </div>
        </>}

      </div>

    </section>
  );
};

export default TopSubjects;
