const videoModel = require("../models/video.model");

const getAllVideos = async () => {
  return await videoModel.getAllVideos();
};

const getVideoById = async (id) => {
  const videos = await videoModel.getAllVideos();

  return videos.find((video) => video._id.toString() === id);
};

const addVideo = async (videoData) => {
  const videos = await videoModel.getAllVideos();

  const watchTime =
    videoData.watchTime ??
    videoData.totalWatchTime ??
    0;

  const existingVideo = videos.find(
    (video) => video.videoId === videoData.videoId
  );

  if (existingVideo) {
    existingVideo.watchTime += watchTime;
    existingVideo.lastWatched = new Date();

    return await existingVideo.save();
  }

  const newVideo = {
    videoId: videoData.videoId,
    title: videoData.title,
    channel: videoData.channel,
    thumbnail: videoData.thumbnail,
    duration: videoData.duration,
    watchTime: watchTime,
    category: videoData.category,
    url: videoData.url,
    watchedAt: new Date(),
    lastWatched: new Date(),
  };

  return await videoModel.saveVideo(newVideo);
};

const updateVideo = async (id, updatedData) => {
  return await videoModel.updateVideo(id, updatedData);
};

const deleteVideo = async (id) => {
  const deletedVideo = await videoModel.deleteVideo(id);

  return deletedVideo ? true : false;
};

const getSummary = async () => {
  const videos = await videoModel.getAllVideos();

  const totalVideos = videos.length;

  const totalStudyTime = videos
    .filter((video) => video.category === "Study")
    .reduce((sum, video) => sum + video.watchTime, 0);

  const totalEntertainmentTime = videos
    .filter((video) => video.category === "Entertainment")
    .reduce((sum, video) => sum + video.watchTime, 0);

  const totalWatchTime =
    totalStudyTime + totalEntertainmentTime;

  return {
    totalVideos,
    totalStudyTime,
    totalEntertainmentTime,
    totalWatchTime,
  };
};

module.exports = {
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
  getSummary,
};