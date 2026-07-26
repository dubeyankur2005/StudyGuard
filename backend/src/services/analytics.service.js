const videoModel = require("../models/video.model");

// ===============================
// Dashboard Analytics
// ===============================

// ===============================
// Dashboard Analytics
// ===============================

const getDashboardAnalytics = async () => {

  const videos = await videoModel.getAllVideos();

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

  const SUBJECT_KEYWORDS = {

    Java: ["java"],

    JavaScript: ["javascript", "js"],

    React: ["react"],

    Node: ["node", "express"],

    Python: ["python"],

    DSA: ["dsa", "leetcode"],

    SQL: ["sql"],

    HTML: ["html"],

    CSS: ["css"],

    MongoDB: ["mongodb"],

  };

  const subjectMap = {};

  studyVideos.forEach((video) => {

    const title =
      video.title.toLowerCase();

    let found = false;

    for (const subject in SUBJECT_KEYWORDS) {

      if (

        SUBJECT_KEYWORDS[subject].some(
          (keyword) =>
            title.includes(keyword)
        )

      ) {

        subjectMap[subject] =
          (subjectMap[subject] || 0) + 1;

        found = true;

        break;

      }

    }

    if (!found) {

      subjectMap.Others =
        (subjectMap.Others || 0) + 1;

    }

  });

  const subjectDistribution =

    Object.entries(subjectMap).map(

      ([name, value]) => ({

        name,

        value,

      })

    );

  // ===============================
  // Most Watched Subject
  // ===============================

  const mostWatchedSubject =

    subjectDistribution.length

      ? subjectDistribution.sort(
          (a, b) => b.value - a.value
        )[0].name

      : "N/A";

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

const getDailyAnalytics = async () => {
  const videos = await videoModel.getAllVideos();

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

const getWeeklyAnalytics = async () => {
  const videos = await videoModel.getAllVideos();

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

const getMonthlyAnalytics = async () => {
  const videos = await videoModel.getAllVideos();

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

const getTopSubjects = async () => {

  const videos = await videoModel.getAllVideos();

  const studyVideos = videos.filter(
    (video) => video.category === "Study"
  );

  const SUBJECT_KEYWORDS = {
    Java: ["java"],
    JavaScript: ["javascript", "js"],
    React: ["react"],
    Node: ["node", "express"],
    Python: ["python"],
    DSA: ["dsa", "leetcode", "algorithm"],
    SQL: ["sql", "database", "mysql"],
    HTML: ["html"],
    CSS: ["css"],
    MongoDB: ["mongodb", "mongo"],
  };

  const subjectCount = {};

  studyVideos.forEach((video) => {

    const title = video.title.toLowerCase();

    let found = false;

    for (const subject in SUBJECT_KEYWORDS) {

      const keywords = SUBJECT_KEYWORDS[subject];

      if (
        keywords.some((keyword) =>
          title.includes(keyword)
        )
      ) {
        subjectCount[subject] =
          (subjectCount[subject] || 0) + 1;

        found = true;

        break;
      }
    }

    if (!found) {
      subjectCount["Others"] =
        (subjectCount["Others"] || 0) + 1;
    }

  });

  const total = Object.values(subjectCount).reduce(
    (sum, value) => sum + value,
    0
  );

  return Object.entries(subjectCount).map(
    ([subject, count]) => ({
      subject,
      percentage: Number(
        ((count / total) * 100).toFixed(2)
      ),
    })
  );

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