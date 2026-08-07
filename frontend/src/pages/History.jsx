import { useEffect, useState } from "react";

import "./History.css";

import HistoryHero from "../components/History/HistoryHero";
import HistoryStats from "../components/History/HistoryStats";
import HistoryTable from "../components/History/HistoryTable";
import HistorySkeleton from "../components/History/HistorySkeleton";
import EmptyHistory from "../components/History/EmptyHistory";

import { getHistory, deleteHistory } from "../api/historyApi";

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const response = await getHistory();

      setVideos(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteHistory(id);

      setVideos((previousVideos) =>
        previousVideos.filter((video) => video._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  const summary = {
    totalVideos: videos.length,

    studyVideos: videos.filter(
      (video) => video.category === "Study"
    ).length,

    entertainmentVideos: videos.filter(
      (video) => video.category === "Entertainment"
    ).length,

    totalWatchTime: videos.reduce(
      (sum, video) => sum + video.watchTime,
      0
    ),
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <HistoryHero />

        {loading ? (
          <HistorySkeleton />
        ) : (
          <>
            <HistoryStats summary={summary} />

            {videos.length === 0 ? (
              <EmptyHistory />
            ) : (
              <HistoryTable
                videos={videos}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default History;