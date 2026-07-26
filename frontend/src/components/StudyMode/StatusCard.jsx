import { useEffect, useState } from "react";

import "./StatusCard.css";

import {
  BsShieldCheck,
  BsYoutube,
  BsClockHistory,
} from "react-icons/bs";

import { getStudyModeStatus } from "../../api/studyModeApi";

const StatusCard = () => {

  const [status, setStatus] = useState({
    studyMode: false,
    blockedVideosToday: 0,
    focusTimeToday: 0,
  });

  useEffect(() => {

    loadStatus();

  }, []);

  async function loadStatus() {

    try {

      const response = await getStudyModeStatus();

      setStatus(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  function formatTime(seconds) {

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    if (hours > 0) {

      return `${hours}h ${minutes}m`;

    }

    if (minutes > 0) {

      return `${minutes}m ${secs}s`;

    }

    return `${secs}s`;

  }

  return (

    <section className="status-section">

      <div className="section-header">

        <h2>

          Current Protection Status

        </h2>

        <p>

          Real-time overview of your StudyGuard protection.

        </p>

      </div>

      <div className="status-grid">

        {/* Study Mode */}

        <div className="status-card">

          <div className="status-icon green">

            <BsShieldCheck />

          </div>

          <div className="status-content">

            <h4>

              Study Mode

            </h4>

            <h3>

              {status.studyMode ? "ACTIVE" : "OFF"}

            </h3>

            <span
              className={`status-badge ${
                status.studyMode
                  ? "success"
                  : "danger"
              }`}
            >

              {status.studyMode
                ? "Protection Enabled"
                : "Protection Disabled"}

            </span>

          </div>

        </div>

        {/* Blocked Videos */}

        <div className="status-card">

          <div className="status-icon red">

            <BsYoutube />

          </div>

          <div className="status-content">

            <h4>

              Blocked Videos

            </h4>

            <h3>

              {status.blockedVideosToday}

            </h3>

            <span className="status-badge danger">

              Today

            </span>

          </div>

        </div>

        {/* Focus Time */}

        <div className="status-card">

          <div className="status-icon blue">

            <BsClockHistory />

          </div>

          <div className="status-content">

            <h4>

              Focus Time

            </h4>

            <h3>

              {formatTime(
                status.focusTimeToday
              )}

            </h3>

            <span className="status-badge info">

              Today

            </span>

          </div>

        </div>

      </div>

    </section>

  );

};

export default StatusCard;