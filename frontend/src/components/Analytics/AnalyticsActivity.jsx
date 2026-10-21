import "./AnalyticsActivity.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#14B8A6",
  "#3B82F6",
  "#F97316",
  "#8B5CF6",
  "#22C55E",
];

const AnalyticsActivity = ({ analytics }) => {

  const dailyActivity =
    analytics.dailyActivity || [];

  const subjects =
    analytics.subjectDistribution || [];
  const hasClassifiableSubjects = subjects.some((subject) => subject.name !== "Unclassified");

  return (

    <section className="analytics-activity">

      {/* Daily Activity */}

      <div className="activity-card">

        <div className="activity-header">

          <h3>

            Daily Activity

          </h3>

          <p>

            Study time for last 7 days

          </p>

        </div>

        <ResponsiveContainer
          width="100%"
          height={330}
        >

          <BarChart
            data={dailyActivity}
          >

            <CartesianGrid
              stroke="#23324D"
            />

            <XAxis
              dataKey="day"
              stroke="#9DB2CE"
            />

            <YAxis
              stroke="#9DB2CE"
            />

            <Tooltip />

            <Bar
              dataKey="studyTime"
              fill="#14B8A6"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Subject Distribution */}

      <div className="activity-card">

        <div className="activity-header">

          <h3>

            Subject Distribution

          </h3>

          <p>

            Most watched topics

          </p>

        </div>

        {hasClassifiableSubjects ? <ResponsiveContainer
          width="100%"
          height={330}
        >

          <PieChart>

            <Pie

              data={subjects}

              dataKey="percentage"
              nameKey="name"

              innerRadius={75}

              outerRadius={110}

            >

              {

                subjects.map((item,index)=>(

                  <Cell

                    key={item.name}

                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }

                  />

                ))

              }

            </Pie>

            <Tooltip formatter={(value) => [`${value}%`, "Study videos"]} />
            <Legend />

          </PieChart>

        </ResponsiveContainer> : <div className="subject-distribution-empty" role="status">
          <strong>No classifiable subjects yet</strong>
          <span>{subjects.length ? `${subjects.find((subject) => subject.name === "Unclassified")?.count || 0} study videos could not be classified from their titles.` : "Study video history will appear here once available."}</span>
        </div>}

      </div>

    </section>

  );

};

export default AnalyticsActivity;
