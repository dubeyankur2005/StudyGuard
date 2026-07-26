const videoModel = require("../models/video.model");

const getAllVideos = async () => {
  return await videoModel.getAllVideos();
};

const getVideoById = async (id) => {
  const videos = await videoModel.getAllVideos();

  return videos.find((video) => video.id === Number(id));
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

    existingVideo.lastWatched = new Date().toISOString();

    await videoModel.saveAllVideos(videos);

    return existingVideo;

  }

  const newVideo = {

    id: videos.length
      ? videos[videos.length - 1].id + 1
      : 1,

    videoId: videoData.videoId,

    title: videoData.title,

    channel: videoData.channel,

    thumbnail: videoData.thumbnail,

    duration: videoData.duration,

    watchTime: watchTime,

    category: videoData.category,

    watchedAt: new Date().toISOString(),

    lastWatched: new Date().toISOString(),

  };

  videos.push(newVideo);

  await videoModel.saveAllVideos(videos);

  return newVideo;

};

const updateVideo = async (id, updatedData) => {
  const videos = await videoModel.getAllVideos();

  const index = videos.findIndex((video) => video.id === Number(id));

  if (index === -1) return null;

  videos[index] = {
    ...videos[index],
    ...updatedData,
    lastWatched: new Date().toISOString(),
  };

  await videoModel.saveAllVideos(videos);

  return videos[index];
};

const deleteVideo = async (id) => {
  const videos = await videoModel.getAllVideos();

  const index = videos.findIndex((video) => video.id === Number(id));

  if (index === -1) return false;

  videos.splice(index, 1);

  await videoModel.saveAllVideos(videos);

  return true;
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

  const totalWatchTime = totalStudyTime + totalEntertainmentTime;

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