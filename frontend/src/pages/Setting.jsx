import "./Setting.css";

import {
  BsShieldLock,
  BsPersonCircle,
  BsBullseye,
  BsBell,
  BsCloudArrowUp,
  BsPalette,
} from "react-icons/bs";

const features = [

  {
    icon: <BsShieldLock />,
    title: "Authentication",
    description: "Secure Login, Registration & Password Recovery",
  },

  {
    icon: <BsPersonCircle />,
    title: "Profile",
    description: "Manage your profile and account preferences",
  },

  {
    icon: <BsBullseye />,
    title: "Goal Management",
    description: "Create daily and weekly study goals",
  },

  {
    icon: <BsBell />,
    title: "Notifications",
    description: "Reminder settings and smart alerts",
  },

  {
    icon: <BsCloudArrowUp />,
    title: "Cloud Sync",
    description: "Sync your progress across devices",
  },

  {
    icon: <BsPalette />,
    title: "Appearance",
    description: "Theme customization and personalization",
  },

];

const Setting = () => {

  return (

    <div className="settings-page">

      <div className="settings-header">

        <span className="settings-tag">

          ⚙️ Settings

        </span>

        <h1>

          Configure StudyGuard

        </h1>

        <p>

          Powerful settings and personalization features are currently
          under development. They'll be available in upcoming releases.

        </p>

      </div>

      <div className="settings-grid">

        {

          features.map((feature, index) => (

            <div
              className="setting-card"
              key={index}
            >

              <div className="setting-icon">

                {feature.icon}

              </div>

              <h3>

                {feature.title}

              </h3>

              <p>

                {feature.description}

              </p>

              <span className="progress-badge">

                Under Development

              </span>

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default Setting;