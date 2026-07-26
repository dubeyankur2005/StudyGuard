import { useEffect, useState } from "react";

import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsSection from "../components/dashboard/StatsSection";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentVideos from "../components/dashboard/RecentVideos";
import TopSubjects from "../components/dashboard/TopSubjects";

import { getDashboardSummary } from "../api/dashboardApi";
import { getAllVideos } from "../api/videoApi";

import "./Dashboard.css";

const Dashboard = () => {

  const [summary, setSummary] = useState(null);

  const [videos, setVideos] = useState([]);

  useEffect(() => {

    fetchDashboardSummary();

    fetchVideos();

  }, []);

  async function fetchDashboardSummary() {

    try {

      const response = await getDashboardSummary();

      setSummary(response);

    } catch (error) {

      console.error(error);

    }

  }

  async function fetchVideos() {

    try {

      const response = await getAllVideos();

      setVideos(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="dashboard-page">

      <div className="dashboard-container">

        <WelcomeSection />

        <StatsSection summary={summary} />

        <ChartsSection summary={summary} />

        <div className="dashboard-bottom">

          <RecentVideos videos={videos.slice(0, 4)} />

          <TopSubjects />

        </div>

      </div>

    </div>

  );

};

export default Dashboard;