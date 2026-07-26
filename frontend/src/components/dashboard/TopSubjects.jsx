import "./TopSubjects.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { topSubjects } from "../../data/dashboardData";

const COLORS = [
  "#14B8A6",
  "#6366F1",
  "#F59E0B",
  "#EC4899",
  "#3B82F6",
];

const TopSubjects = () => {
  return (
    <section className="top-subjects">

      <div className="section-header">
        <h3>Top Subjects</h3>
      </div>

      <div className="subjects-container">

        <div className="subject-chart">

          <ResponsiveContainer width="100%" height={220}>

            <PieChart>

              <Pie
                data={topSubjects}
                dataKey="percentage"
                nameKey="subject"
                innerRadius={55}
                outerRadius={85}
              >

                {topSubjects.map((item, index) => (
                  <Cell
                    key={item.id}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="subject-list">

          {topSubjects.map((item, index) => (

            <div
              className="subject-item"
              key={item.id}
            >

              <span
                className="color-dot"
                style={{
                  background: COLORS[index],
                }}
              ></span>

              <span className="subject-name">
                {item.subject}
              </span>

              <span className="subject-value">
                {item.percentage}%
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default TopSubjects;