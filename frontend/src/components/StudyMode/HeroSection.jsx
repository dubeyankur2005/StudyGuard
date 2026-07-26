import "./HeroSection.css";

import {
  BsShieldLockFill,
  BsShieldCheck,
  BsStars,
} from "react-icons/bs";

import {
  MdOutlineVideoLibrary,
  MdOutlineGpsFixed,
} from "react-icons/md";

const HeroSection = () => {

  return (

    <section className="study-hero">

      {/* ================= Left ================= */}

      <div className="hero-left">

        <span className="hero-badge">

          Study Mode

        </span>

        <h1>

          Study Mode is <span>ON</span>

        </h1>

        <p>

          You're protected from distractions and can focus
          on what really matters — your learning.

        </p>

        

        <div className="hero-features">

          <div className="hero-feature">

            <BsShieldCheck />

            <span>Distractions Blocked</span>

          </div>

          <div className="hero-feature">

            <MdOutlineVideoLibrary />

            <span>Shorts Hidden</span>

          </div>

          <div className="hero-feature">

            <BsStars />

            <span>Recommendations Filtered</span>

          </div>

          <div className="hero-feature">

            <MdOutlineGpsFixed />

            <span>Focus Enhanced</span>

          </div>

        </div>

      </div>

      {/* ================= Right ================= */}

      <div className="hero-right">

        <div className="hero-icon">

          <BsShieldLockFill />

        </div>

      </div>

    </section>

  );

};

export default HeroSection;