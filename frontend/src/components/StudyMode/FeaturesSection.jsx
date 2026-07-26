import "./FeaturesSection.css";

import {
  BsYoutube,
  BsCollectionPlay,
  BsStars,
  BsChatSquareDots,
  BsCheckCircleFill,
  BsChevronRight,
} from "react-icons/bs";

const features = [

  {
    id: 1,
    icon: BsYoutube,
    title: "Block Entertainment",
    description:
      "Prevent entertainment videos from playing while Study Mode is active.",
    color: "pink",
  },

  {
    id: 2,
    icon: BsCollectionPlay,
    title: "Hide Shorts",
    description:
      "Remove YouTube Shorts to eliminate endless scrolling distractions.",
    color: "purple",
  },

  {
    id: 3,
    icon: BsStars,
    title: "Hide Recommendations",
    description:
      "Hide recommended videos so you stay focused on your learning goal.",
    color: "blue",
  },

  {
    id: 4,
    icon: BsChatSquareDots,
    title: "Hide Comments",
    description:
      "Remove comments section to reduce distractions while studying.",
    color: "orange",
  },

];

const FeaturesSection = () => {

  return (

    <section className="features-section">

      {

        features.map((feature) => {

          const Icon = feature.icon;

          return (

            <div
              className="feature-card"
              key={feature.id}
            >

              {/* Background Icon */}

              <div className="feature-bg-icon">

                <Icon />

              </div>

              {/* Main Icon */}

              <div className={`feature-icon ${feature.color}`}>

                <Icon />

              </div>

              <h3>

                {feature.title}

              </h3>

              <p>

                {feature.description}

              </p>

              {/* Bottom */}

              <div className="feature-footer">

                <div className="feature-status">

                  <BsCheckCircleFill />

                  <span>Active</span>

                </div>

                <button className="feature-arrow">

                  <BsChevronRight />

                </button>

              </div>

            </div>

          );

        })

      }

    </section>

  );

};

export default FeaturesSection;