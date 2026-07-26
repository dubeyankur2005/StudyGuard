import { useEffect, useState } from "react";

import "./ToggleCard.css";

import {
  getSettings,
  updateSettings,
} from "../../api/settingsApi";

import { BsPower } from "react-icons/bs";

const ToggleCard = () => {

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {

    loadSettings();

  }, []);

  async function loadSettings() {

    try {

      const response = await getSettings();

      setEnabled(response.data.studyMode);

    } catch (error) {

      console.error(error);

    }

  }

  async function handleToggle() {

    const newValue = !enabled;

    setEnabled(newValue);

    try {

      await updateSettings({

        studyMode: newValue,

      });

    } catch (error) {

      console.error(error);

      setEnabled(!newValue);

    }

  }

  return (

    <section className="toggle-card">

      {/* Left */}

      <div className="toggle-left">

        <div className="power-wrapper">

          <div className="power-ring">

            <div className="power-circle">

              <BsPower />

            </div>

          </div>

        </div>

        <div className="toggle-content">

          <h2>

            Enable Study Mode

          </h2>

          <p>

            When enabled, StudyGuard blocks entertainment
            videos and removes distracting content from
            YouTube.

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="toggle-right">

        <div
          className={`switch ${enabled ? "active" : ""}`}
          onClick={handleToggle}
        >

          <div className="switch-circle"></div>

        </div>

        <span
          className={`toggle-status ${
            enabled ? "enabled" : "disabled"
          }`}
        >

          {enabled ? "ON" : "OFF"}

        </span>

      </div>

    </section>

  );

};

export default ToggleCard;