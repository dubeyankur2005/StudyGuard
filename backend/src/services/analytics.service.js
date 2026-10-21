const videoModel = require("../models/video.model");
const { buildSubjectDistribution } = require("../utils/subjectAnalytics");

// ===============================
// Dashboard Analytics
// ===============================

// ===============================
// Dashboard Analytics
// ===============================

const getDashboardAnalytics = async (owner) => {

  const videos = await videoModel.getAllVideos(owner);

  const totalVideos = videos.length;

  const studyVideos = videos.filter(
    (video) => video.category === "Study"
  );

  const entertainmentVideos = videos.filter(
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

  const totalWatchTime =
    totalStudyTime + totalEntertainmentTime;

  const studyPercentage =
    totalWatchTime === 0
      ? 0
      : Number(
          (
            (totalStudyTime / totalWatchTime) *
            100
          ).toFixed(2)
        );

  const entertainmentPercentage =
    totalWatchTime === 0
      ? 0
      : Number(
          (
            (totalEntertainmentTime /
              totalWatchTime) *
            100
          ).toFixed(2)
        );

  // ===============================
  // Weekly Study Trend
  // ===============================

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const weeklyStudyTrend = [];

  for (let i = 6; i >= 0; i--) {

    const date = new Date();

    date.setDate(date.getDate() - i);

    const studyTime = videos

      .filter((video) => {

        const watchedDate = new Date(video.watchedAt);

        return (

          watchedDate.toDateString() ===
            date.toDateString() &&

          video.category === "Study"

        );

      })

      .reduce(
        (sum, video) =>
          sum + video.watchTime,
        0
      );

    weeklyStudyTrend.push({

      day: days[date.getDay()],

      studyTime,

    });

  }

  // ===============================
  // Daily Activity
  // ===============================

  const dailyActivity = weeklyStudyTrend;

  // ===============================
  // Subject Distribution
  // ===============================

  const subjectDistribution = buildSubjectDistribution(studyVideos);

  // ===============================
  // Most Watched Subject
  // ===============================

  const mostWatchedSubject =

    subjectDistribution.find((subject) => subject.name !== "Unclassified")?.name || "N/A";

  // ===============================
  // Most Watched Channel
  // ===============================

  const channelMap = {};

  videos.forEach((video) => {

    channelMap[video.channel] =

      (channelMap[video.channel] || 0) + 1;

  });

  const mostWatchedChannel =

    Object.keys(channelMap).length

      ? Object.entries(channelMap)

          .sort((a, b) => b[1] - a[1])[0][0]

      : "N/A";

  // ===============================
  // Most Productive Day
  // ===============================

  const mostProductiveDay =

    weeklyStudyTrend.sort(
      (a, b) => b.studyTime - a.studyTime
    )[0]?.day || "N/A";

  // ===============================
  // Most Productive Hour
  // ===============================

  const hourMap = {};

  studyVideos.forEach((video) => {

    const hour =

      new Date(video.watchedAt).getHours();

    hourMap[hour] =

      (hourMap[hour] || 0) +

      video.watchTime;

  });

  const mostProductiveHour =

    Object.keys(hourMap).length

      ? Object.entries(hourMap)

          .sort((a, b) => b[1] - a[1])[0][0] + ":00"

      : "N/A";

  // ===============================
  // Final Response
  // ===============================

  return {

    totalVideos,

    totalWatchTime,

    totalStudyTime,

    totalEntertainmentTime,

    studyPercentage,

    entertainmentPercentage,

    weeklyStudyTrend,

    dailyActivity,

    subjectDistribution,

    mostWatchedSubject,

    mostWatchedChannel,

    mostProductiveDay,

    mostProductiveHour,

  };

};

// ===============================
// Daily Analytics
// ===============================

const getDailyAnalytics = async (owner) => {
  const videos = await videoModel.getAllVideos(owner);

  const today = new Date().toDateString();

  const todayVideos = videos.filter(
    (video) =>
      new Date(video.watchedAt).toDateString() ===
      today
  );

  const studyTime = todayVideos
    .filter((video) => video.category === "Study")
    .reduce((sum, video) => sum + video.watchTime, 0);

  const entertainmentTime = todayVideos
    .filter((video) => video.category === "Entertainment")
    .reduce((sum, video) => sum + video.watchTime, 0);

  return {
    date: today,
    totalVideos: todayVideos.length,
    studyTime,
    entertainmentTime,
    totalWatchTime: studyTime + entertainmentTime,
  };
};

// ===============================
// Weekly Analytics
// ===============================

const getWeeklyAnalytics = async (owner) => {
  const videos = await videoModel.getAllVideos(owner);

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const weeklyData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const dayName = days[date.getDay()];

    const studyTime = videos
      .filter((video) => {
        const watchedDate = new Date(video.watchedAt);

        return (
          watchedDate.toDateString() ===
            date.toDateString() &&
          video.category === "Study"
        );
      })
      .reduce((sum, video) => sum + video.watchTime, 0);

    weeklyData.push({
      day: dayName,
      hours: Number((studyTime / 60).toFixed(2)),
    });
  }

  return weeklyData;
};

// ===============================
// Monthly Analytics
// ===============================

const getMonthlyAnalytics = async (owner) => {
  const videos = await videoModel.getAllVideos(owner);

  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();

  const monthlyVideos = videos.filter((video) => {
    const date = new Date(video.watchedAt);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const studyTime = monthlyVideos
    .filter((video) => video.category === "Study")
    .reduce((sum, video) => sum + video.watchTime, 0);

  const entertainmentTime = monthlyVideos
    .filter((video) => video.category === "Entertainment")
    .reduce((sum, video) => sum + video.watchTime, 0);

  return {
    totalVideos: monthlyVideos.length,
    studyTime,
    entertainmentTime,
    totalWatchTime: studyTime + entertainmentTime,
  };
};

// ===============================
// Top Subjects
// ===============================

const getTopSubjects = async (owner) => {

  const videos = await videoModel.getAllVideos(owner);
  return buildSubjectDistribution(videos);

};

// ===============================
// Export
// ===============================

module.exports = {
  getDashboardAnalytics,
  getDailyAnalytics,
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getTopSubjects,
};
