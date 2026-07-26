import { useEffect, useState } from "react";

import "./LineChartCard.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getWeeklyAnalytics } from "../../api/analyticsApi";

const LineChartCard = () => {

  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchWeeklyAnalytics();
  }, []);

  async function fetchWeeklyAnalytics() {
    try {

      const response = await getWeeklyAnalytics();

      setWeeklyData(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  if (!weeklyData.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="chart-card">

      <div className="chart-header">
        <h3>Weekly Study Trend</h3>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={weeklyData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2C3547"
          />

          <XAxis
            dataKey="day"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="hours"
            stroke="#14B8A6"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default LineChartCard;