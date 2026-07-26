import "./AnalyticsCards.css";

import {
  BsBookHalf,
  BsPlayCircle,
  BsClockHistory,
  BsGraphUpArrow,
} from "react-icons/bs";

const AnalyticsCards = ({ analytics }) => {

  function formatTime(seconds = 0) {

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {

      return `${hours}h ${minutes}m`;

    }

    return `${minutes}m`;

  }

  const cards = [

    {
      title: "Study Time",
      value: formatTime(analytics.totalStudyTime),
      subtitle: "Educational Learning",
      icon: <BsBookHalf />,
      color: "green",
    },

    {
      title: "Entertainment",
      value: formatTime(analytics.totalEntertainmentTime),
      subtitle: "Leisure Watch Time",
      icon: <BsPlayCircle />,
      color: "orange",
    },

    {
      title: "Videos Watched",
      value: analytics.totalVideos,
      subtitle: "Tracked Videos",
      icon: <BsClockHistory />,
      color: "purple",
    },

    {
      title: "Study Ratio",
      value: `${analytics.studyPercentage}%`,
      subtitle: "Overall Productivity",
      icon: <BsGraphUpArrow />,
      color: "blue",
    },

  ];

  return (

    <section className="analytics-cards">

      {

        cards.map((card,index)=>(

          <div
            className="analytics-card"
            key={index}
          >

            <div className={`analytics-icon ${card.color}`}>

              {card.icon}

            </div>

            <div className="analytics-info">

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

export default AnalyticsCards;