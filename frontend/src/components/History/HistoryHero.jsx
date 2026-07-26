import "./HistoryHero.css";

import { BsClockHistory } from "react-icons/bs";

const HistoryHero = () => {
  return (
    <section className="history-hero">

      <div className="history-hero-left">

        <div className="history-badge">

          <BsClockHistory />

          <span>History</span>

        </div>

        <h1>Watch History</h1>

        <p>
          Track every YouTube video you've watched, monitor your
          study progress, and review your learning journey.
        </p>

      </div>

    </section>
  );
};

export default HistoryHero;