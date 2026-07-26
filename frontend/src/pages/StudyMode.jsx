import "./StudyMode.css";

import HeroSection from "../components/StudyMode/HeroSection";
import ToggleCard from "../components/StudyMode/ToggleCard";
import FeaturesSection from "../components/StudyMode/FeaturesSection";
import StatusCard from "../components/StudyMode/StatusCard";
import TipsCard from "../components/StudyMode/TipsCard";

const StudyMode = () => {

  return (

    <div className="study-mode-page">

      <div className="study-mode-container">

        <HeroSection />

        <ToggleCard />

        <FeaturesSection />

        <div className="study-bottom">

          <StatusCard />

          <TipsCard />

        </div>

      </div>

    </div>

  );

};

export default StudyMode;