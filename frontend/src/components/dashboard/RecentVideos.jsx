import "./RecentVideo.css";

import { useNavigate } from "react-router-dom";

const RecentVideos = ({ videos }) => {

  const navigate = useNavigate();

  if (!videos.length) {

    return <p>Loading...</p>;

  }

  return (

    <section className="recent-videos">

      <div className="section-header">

        <h3>Recent Videos</h3>

        <button
          className="view-btn"
          onClick={() => navigate("/history")}
        >
          View All
        </button>

      </div>

      <div className="video-list">

        {videos.map((video) => (

          <div
            className="video-item"
            key={video.id}
          >

            <div className="thumbnail">

              <img
                src={video.thumbnail}
                alt={video.title}
              />

            </div>

            <div className="video-info">

              <h4>{video.title}</h4>

              <p>{video.channel}</p>

            </div>

            <div className="video-right">

              <span
                className={
                  video.category === "Study"
                    ? "badge study"
                    : "badge entertainment"
                }
              >
                {video.category}
              </span>

              <small>
                {new Date(video.lastWatched).toLocaleString()}
              </small>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

};

export default RecentVideos;