import {
  BsBook,
  BsJoystick,
  BsYoutube,
  BsFire,
} from "react-icons/bs";

import StatCard from "./StatCard";
import "./StatsSection.css";

const StatsSection = ({ summary }) => {

  if (!summary) {
    return <p>Loading...</p>;
  }

  // ===============================
  // Format Seconds
  // ===============================

  const formatTime = (seconds) => {

    if (!seconds) return "0 sec";

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} sec`;
    }

    return `${minutes}m ${remainingSeconds}s`;

  };

  // ===============================
  // Dashboard Cards
  // ===============================

  const stats = [

    {
      id: 1,
      title: "Study Time",
      value: formatTime(summary.data.totalStudyTime),
      percentage: "",
      icon: BsBook,
      variant: "study",
    },

    {
      id: 2,
      title: "Entertainment Time",
      value: formatTime(summary.data.totalEntertainmentTime),
      percentage: "",
      icon: BsJoystick,
      variant: "entertainment",
    },

    {
      id: 3,
      title: "Videos Watched",
      value: summary.data.totalVideos ?? 0,
      percentage: "",
      icon: BsYoutube,
      variant: "video",
    },

    {
      id: 4,
      title: "Study Streak",
      value: "Coming Soon",
      percentage: "",
      icon: BsFire,
      variant: "streak",
    },

  ];

  return (
    <section className="stats-section">

      {stats.map((item) => (
        <StatCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          value={item.value}
          percentage={item.percentage}
          variant={item.variant}
        />
      ))}

    </section>
  );
};

export default StatsSection;