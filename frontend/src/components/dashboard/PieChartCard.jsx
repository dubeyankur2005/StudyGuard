import "./PieChartCard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#14B8A6",
  "#F97316",
];

const PieChartCard = ({ summary }) => {

  if (!summary) {
    return <p>Loading...</p>;
  }

  const studyTime = summary.data.totalStudyTime ?? 0;
  const entertainmentTime = summary.data.totalEntertainmentTime ?? 0;

  const totalTime = studyTime + entertainmentTime;

  const pieChartData = [
    {
      name: "Study",
      value: studyTime,
    },
    {
      name: "Entertainment",
      value: entertainmentTime,
    },
  ];

  const studyPercentage =
    totalTime === 0
      ? 0
      : ((studyTime / totalTime) * 100).toFixed(0);

  const entertainmentPercentage =
    totalTime === 0
      ? 0
      : ((entertainmentTime / totalTime) * 100).toFixed(0);

  function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} sec`;
    }

    if (remainingSeconds === 0) {
      return `${minutes} min`;
    }

    return `${minutes}m ${remainingSeconds}s`;

  }

  return (
    <div className="chart-card">

      <div className="chart-header">
        <h3>Study vs Entertainment</h3>
      </div>

      <div className="chart-body">

        <div className="pie-wrapper">

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="40%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
              >

                {pieChartData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <text
                x="40%"
                y="47%"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="14"
              >
                Total
              </text>

              <text
                x="40%"
                y="57%"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="30"
                fontWeight="700"
              >
                {formatTime(totalTime)}
              </text>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-legend">

          <div className="legend-item">

            <div className="legend-left">

              <span
                className="legend-color"
                style={{ background: COLORS[0] }}
              />

              <div>

                <h4>Study Time</h4>

                <p>
                  {formatTime(studyTime)} ({studyPercentage}%)
                </p>

              </div>

            </div>

          </div>

          <div className="legend-item">

            <div className="legend-left">

              <span
                className="legend-color"
                style={{ background: COLORS[1] }}
              />

              <div>

                <h4>Entertainment Time</h4>

                <p>
                  {formatTime(entertainmentTime)} ({entertainmentPercentage}%)
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PieChartCard;