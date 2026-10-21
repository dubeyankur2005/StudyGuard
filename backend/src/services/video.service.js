const videoModel = require("../models/video.model");

const getAllVideos = async (owner) => {
  return await videoModel.getAllVideos(owner);
};

const getVideoById = async (id, owner) => {
  const mongoose = require("mongoose");
  if (!mongoose.isValidObjectId(id)) return null;
  return videoModel.Video.findOne({ _id: id, owner });
};

const addVideo = async (videoData, owner) => {
  const videos = await videoModel.getAllVideos(owner);

  const watchTime =
    videoData.watchTime ??
    videoData.totalWatchTime ??
    0;

  const existingVideo = videos.find((video) => video.videoId === videoData.videoId);

  if (existingVideo) {
    existingVideo.watchTime += watchTime;
    existingVideo.lastWatched = new Date();

    return await existingVideo.save();
  }

  const newVideo = {
    owner,
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

const updateVideo = async (id, owner, updatedData) => {
  return await videoModel.updateVideo(id, owner, updatedData);
};

const deleteVideo = async (id, owner) => {
  const deletedVideo = await videoModel.deleteVideo(id, owner);

  return deletedVideo ? true : false;
};

const getSummary = async (owner) => {
  const videos = await videoModel.getAllVideos(owner);

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
