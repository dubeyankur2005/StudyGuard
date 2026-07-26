import "./StatCard.css";

const StatCard = ({
  icon: Icon,
  title,
  value,
  percentage,
  variant,
}) => {
  return (
    <div className={`stat-card ${variant}`}>

      <div className="card-glow"></div>

      <div className="card-top">

        <div className="icon-box">
          <Icon />
        </div>

      </div>

      <div className="card-content">

        <h4>{title}</h4>

        <h2>{value}</h2>

        <p>{percentage}</p>

      </div>

      <svg
        className="trend-line"
        viewBox="0 0 120 60"
        preserveAspectRatio="none"
      >
        <path
          d="M5 55
             C20 45 28 42 40 30
             S62 36 72 26
             S95 12 115 8"
        />
      </svg>

    </div>
  );
};

export default StatCard;