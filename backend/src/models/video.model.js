const fs = require("fs/promises");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/videos.json");

const ensureFileExists = async () => {
  try {
    await fs.access(DATA_PATH);
  } catch (error) {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });

    await fs.writeFile(
      DATA_PATH,
      JSON.stringify([], null, 2)
    );
  }
};

const getAllVideos = async () => {
  await ensureFileExists();

  const data = await fs.readFile(DATA_PATH, "utf-8");

  return JSON.parse(data);
};

const saveAllVideos = async (videos) => {
  await ensureFileExists();

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(videos, null, 2)
  );

  return true;
};

const getVideosByCategory = async (category) => {
  const videos = await getAllVideos();

  return videos.filter(
    (video) => video.category === category
  );
};

const getVideosByChannel = async (channel) => {
  const videos = await getAllVideos();

  return videos.filter(
    (video) => video.channel === channel
  );
};

const getVideosByDate = async (date) => {
  const videos = await getAllVideos();

  return videos.filter(
    (video) =>
      new Date(video.watchedAt).toDateString() ===
      new Date(date).toDateString()
  );
};

module.exports = {
  getAllVideos,
  saveAllVideos,
  getVideosByCategory,
  getVideosByChannel,
  getVideosByDate,
};