import "./TipsCard.css";

import {
  BsBook,
  BsBullseye,
  BsCupHot,
  BsCheckCircleFill,
} from "react-icons/bs";

const tips = [

  {
    id: 1,
    icon: <BsBook />,
    title: "One Topic",
    description:
      "Stay focused on one topic at a time to improve understanding.",
  },

  {
    id: 2,
    icon: <BsBullseye />,
    title: "No Multitasking",
    description:
      "Avoid switching between tasks while studying for better focus.",
  },

  {
    id: 3,
    icon: <BsCupHot />,
    title: "Take Breaks",
    description:
      "Take a 10 minute break after every 50 minutes of study.",
  },

  {
    id: 4,
    icon: <BsCheckCircleFill />,
    title: "Finish Daily Goal",
    description:
      "Complete today's study goal before watching entertainment.",
  },

];

const TipsCard = () => {

  return (

    <section className="tips-section">

      <div className="tips-header">

        <h2>Study Tips</h2>

        <p>

          Small habits make a huge difference in long-term learning.

        </p>

      </div>

      <div className="tips-grid">

        {

          tips.map((tip) => (

            <div
              className="tip-card"
              key={tip.id}
            >

              <div className="tip-icon">

                {tip.icon}

              </div>

              <div className="tip-content">

                <h3>

                  {tip.title}

                </h3>

                <p>

                  {tip.description}

                </p>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

};

export default TipsCard;