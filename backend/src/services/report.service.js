const videoModel = require("../models/video.model");

const getWeeklyReport = async (owner) => {
  const videos = await videoModel.getAllVideos(owner);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyVideos = videos.filter(
    (video) => new Date(video.watchedAt) >= sevenDaysAgo
  );

  const totalVideos = weeklyVideos.length;

  const studyVideos = weeklyVideos.filter(
    (video) => video.category === "Study"
  );

  const entertainmentVideos = weeklyVideos.filter(
    (video) => video.category === "Entertainment"
  );

  const totalStudyTime = studyVideos.reduce(
    (sum, video) => sum + video.watchTime,
    0
  );

  const totalEntertainmentTime = entertainmentVideos.reduce(
    (sum, video) => sum + video.watchTime,
    0
  );

  const totalWatchTime = totalStudyTime + totalEntertainmentTime;

  const mostWatchedChannel = getMostWatchedChannel(weeklyVideos);
  const mostWatchedCategory = getMostWatchedCategory(weeklyVideos);

  const productivityScore =
    totalWatchTime === 0
      ? 0
      : Math.round((totalStudyTime / totalWatchTime) * 100);

  return {
    totalVideos,
    totalStudyTime,
    totalEntertainmentTime,
    totalWatchTime,
    productivityScore,
    mostWatchedChannel,
    mostWatchedCategory,
    videos: weeklyVideos,
  };
};

const exportCSV = async (owner) => {
  const report = await getWeeklyReport(owner);

  const rows = [
    [
      "Title",
      "Channel",
      "Category",
      "Watch Time (sec)",
      "Watched At",
    ],
  ];

  report.videos.forEach((video) => {
    rows.push([
      `"${video.title}"`,
      `"${video.channel}"`,
      video.category,
      video.watchTime,
      video.watchedAt,
    ]);
  });

  return rows.map((row) => row.join(",")).join("\n");
};

const exportPDF = async (owner) => {
  const report = await getWeeklyReport(owner);

  const content = `
StudyGuard Weekly Report

Total Videos: ${report.totalVideos}
Study Time: ${report.totalStudyTime}
Entertainment Time: ${report.totalEntertainmentTime}
Total Watch Time: ${report.totalWatchTime}

Productivity Score: ${report.productivityScore}%

Most Watched Channel: ${report.mostWatchedChannel}
Most Watched Category: ${report.mostWatchedCategory}
`;

  return Buffer.from(content);
};

const getMostWatchedChannel = (videos) => {
  if (videos.length === 0) return "";

  const channels = {};

  videos.forEach((video) => {
    channels[video.channel] = (channels[video.channel] || 0) + video.watchTime;
  });

  return Object.keys(channels).reduce((a, b) =>
    channels[a] > channels[b] ? a : b
  );
};

const getMostWatchedCategory = (videos) => {
  if (videos.length === 0) return "";

  const categories = {};

  videos.forEach((video) => {
    categories[video.category] =
      (categories[video.category] || 0) + video.watchTime;
  });

  return Object.keys(categories).reduce((a, b) =>
    categories[a] > categories[b] ? a : b
  );
};

module.exports = {
  getWeeklyReport,
  exportCSV,
  exportPDF,
};
