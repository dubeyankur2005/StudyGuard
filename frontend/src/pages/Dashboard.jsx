import { useEffect, useState } from "react";

import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsSection from "../components/dashboard/StatsSection";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentVideos from "../components/dashboard/RecentVideos";
import TopSubjects from "../components/dashboard/TopSubjects";

import { getDashboardSummary } from "../api/dashboardApi";
import { getAllVideos } from "../api/videoApi";
import { getAnalytics } from "../api/analyticsApi";

import "./Dashboard.css";

const Dashboard = () => {

  const [summary, setSummary] = useState(null);

  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchDashboardSummary = async () => {
      try {
        const response = await getDashboardSummary();
        if (active) setSummary(response);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchVideos = async () => {
      try {
        const response = await getAllVideos();
        if (active) setVideos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardSummary();
    fetchVideos();
    getAnalytics().then((response) => {
      if (active) setSubjects(response.data.data.subjectDistribution || []);
    }).catch((error) => {
      console.error("Unable to load subject analytics:", error);
      if (active) setSubjects([]);
    });
    return () => { active = false; };
  }, []);

  return (

    <div className="dashboard-page">

      <div className="dashboard-container">

        <WelcomeSection />

        <StatsSection summary={summary} />

        <ChartsSection summary={summary} />

        <div className="dashboard-bottom">

          <RecentVideos videos={videos.slice(0, 4)} />

          <TopSubjects subjects={subjects} />

        </div>

      </div>

    </div>

  );

};

export default Dashboard;
