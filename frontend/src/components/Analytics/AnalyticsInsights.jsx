import "./AnalyticsInsights.css";

import {
  BsBookHalf,
  BsYoutube,
  BsCalendarWeek,
  BsClock,
} from "react-icons/bs";

const AnalyticsInsights = ({ analytics }) => {

  const insights = [

    {
      title:"Most Watched Subject",
      value:analytics.mostWatchedSubject,
      icon:<BsBookHalf/>,
      color:"green",
    },

    {
      title:"Most Watched Channel",
      value:analytics.mostWatchedChannel,
      icon:<BsYoutube/>,
      color:"red",
    },

    {
      title:"Most Productive Day",
      value:analytics.mostProductiveDay,
      icon:<BsCalendarWeek/>,
      color:"blue",
    },

    {
      title:"Most Productive Hour",
      value:analytics.mostProductiveHour,
      icon:<BsClock/>,
      color:"purple",
    },

  ];

  return(

    <section className="analytics-insights">

      {

        insights.map((item,index)=>(

          <div
            className="insight-card"
            key={index}
          >

            <div className={`insight-icon ${item.color}`}>

              {item.icon}

            </div>

            <div>

              <p>{item.title}</p>

              <h3>{item.value}</h3>

            </div>

          </div>

        ))

      }

    </section>

  );

};

export default AnalyticsInsights;