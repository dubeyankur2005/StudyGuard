import "./AnalyticsCharts.css";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#14B8A6", "#F97316"];

const AnalyticsCharts = ({ analytics }) => {
  const pieData = [
    {
      name: "Study",
      value: analytics.totalStudyTime,
    },
    {
      name: "Entertainment",
      value: analytics.totalEntertainmentTime,
    },
  ];

  const weeklyData = analytics.weeklyStudyTrend || [];

  return (
    <section className="analytics-charts">

      {/* ================= PIE ================= */}

      <div className="chart-card">

        <div className="chart-header">
          <h3>Study vs Entertainment</h3>
          <p>Watch time distribution</p>
        </div>

        <div className="pie-wrapper">

          <div className="pie-chart">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={115}
                  paddingAngle={6}
                >
                  {pieData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#111A2D",
                    border: "1px solid rgba(45,212,191,.25)",
                    borderRadius: "12px",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="pie-legend">

            <div className="legend-item">

              <span
                className="legend-color"
                style={{ background: "#14B8A6" }}
              ></span>

              <div>

                <h4>Study Time</h4>

                <p>
                  {analytics.totalStudyTime} min ({analytics.studyPercentage}%)
                </p>

              </div>

            </div>

            <div className="legend-item">

              <span
                className="legend-color"
                style={{ background: "#F97316" }}
              ></span>

              <div>

                <h4>Entertainment</h4>

                <p>
                  {analytics.totalEntertainmentTime} min ({analytics.entertainmentPercentage}%)
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= LINE ================= */}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Weekly Study Trend</h3>

          <p>Last 7 days</p>

        </div>

        <ResponsiveContainer
          width="100%"
          height={340}
        >

          <LineChart data={weeklyData}>

            <CartesianGrid
              stroke="rgba(255,255,255,.08)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#B8C5D6", fontSize: 13 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{ fill: "#B8C5D6", fontSize: 13 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111A2D",
                border: "1px solid rgba(45,212,191,.25)",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "#ffffff",
              }}
              itemStyle={{
                color: "#2DD4BF",
              }}
            />

            <Line
              type="monotone"
              dataKey="studyTime"
              stroke="#14B8A6"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#14B8A6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#14B8A6",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
};

export default AnalyticsCharts;