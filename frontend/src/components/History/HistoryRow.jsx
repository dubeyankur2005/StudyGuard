import "./HistoryRow.css";

import {
  BsTrash,
  BsYoutube
} from "react-icons/bs";

const HistoryRow = ({ video, onDelete }) => {

  function formatTime(seconds = 0) {

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }

    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }

    return `${secs}s`;

  }

  function formatDate(date) {

    return new Date(date).toLocaleString();

  }

  return (

    <div className="history-row">

      {/* Video */}

      <div className="history-video">

        <img
          src={video.thumbnail}
          alt={video.title}
        />

        <div className="history-video-info">

          <h4>{video.title}</h4>

          <p>{video.channel}</p>

        </div>

      </div>

      {/* Category */}

      <div>

        <span
          className={`category-badge ${
            video.category === "Study"
              ? "study"
              : "entertainment"
          }`}
        >

          {video.category}

        </span>

      </div>

      {/* Watch Time */}

      <div className="history-watch">

        {formatTime(video.watchTime)}

      </div>

      {/* Watched Date */}

      <div className="history-date">

        {formatDate(video.watchedAt)}

      </div>

      {/* Delete */}

      <button
    className="delete-btn"
    onClick={() => onDelete(video.id)}
>

    <BsTrash />

</button>

    </div>

  );

};

export default HistoryRow;