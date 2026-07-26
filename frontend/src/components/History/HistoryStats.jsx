import "./HistoryStats.css";

import {
  BsCollectionPlay,
  BsMortarboard,
  BsClockHistory
} from "react-icons/bs";

import { MdOutlineMovie } from "react-icons/md";

const HistoryStats = ({ summary }) => {

  const formatTime = (seconds = 0) => {

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    return `${hrs}h ${mins}m`;

  };

  const studyPercent =
    summary.totalVideos === 0
      ? 0
      : (
          (summary.studyVideos / summary.totalVideos) *
          100
        ).toFixed(1);

  const entertainmentPercent =
    summary.totalVideos === 0
      ? 0
      : (
          (summary.entertainmentVideos /
            summary.totalVideos) *
          100
        ).toFixed(1);

  const cards = [

    {
      icon: <BsCollectionPlay />,
      title: "Total Videos",
      value: summary.totalVideos,
      subtitle: "All time watched",
      color: "purple",
    },

    {
      icon: <BsMortarboard />,
      title: "Study Videos",
      value: summary.studyVideos,
      subtitle: `${studyPercent}% of total`,
      color: "green",
    },

    {
      icon: <MdOutlineMovie />,
      title: "Entertainment",
      value: summary.entertainmentVideos,
      subtitle: `${entertainmentPercent}% of total`,
      color: "orange",
    },

    {
      icon: <BsClockHistory />,
      title: "Watch Time",
      value: formatTime(summary.totalWatchTime),
      subtitle: "All time duration",
      color: "blue",
    },

  ];

  return (

    <section className="history-stats">

      {

        cards.map((card, index) => (

          <div
            className="history-stat-card"
            key={index}
          >

            <div className={`history-stat-icon ${card.color}`}>

              {card.icon}

            </div>

            <div className="history-stat-info">

              <p>{card.title}</p>

              <h2>{card.value}</h2>

              <span>{card.subtitle}</span>

            </div>

          </div>

        ))

      }

    </section>

  );

};

export default HistoryStats;