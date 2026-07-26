import "./AnalyticsHero.css";

import {
  BsGraphUpArrow,
  BsBarChartFill,
  BsClockHistory,
  BsFire,
} from "react-icons/bs";

const AnalyticsHero = () => {

  return (

    <section className="analytics-hero">

      <div className="analytics-hero-left">

        <span className="analytics-badge">

          <BsBarChartFill />

          Analytics

        </span>

        <h1>

          Analytics Overview

        </h1>

        <p>

          Monitor your learning journey with detailed study
          insights, watch patterns, productivity trends and
          performance statistics.

        </p>

        <div className="analytics-features">

          <div className="analytics-feature">

            <BsGraphUpArrow />

            <span>Growth Tracking</span>

          </div>

          <div className="analytics-feature">

            <BsClockHistory />

            <span>Study Hours</span>

          </div>

          <div className="analytics-feature">

            <BsFire />

            <span>Daily Progress</span>

          </div>

        </div>

      </div>

      <div className="analytics-hero-right">

        <div className="analytics-circle">

          <BsBarChartFill />

        </div>

      </div>

    </section>

  );

};

export default AnalyticsHero;