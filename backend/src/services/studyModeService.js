const settingsService = require("./settings.service");
const videoService = require("./video.service");

const getStudyModeStatusService = async () => {

  const settings = await settingsService.getSettings();

  const videos = await videoService.getAllVideos();

  const today = new Date().toDateString();

  let focusTimeToday = 0;

  let blockedVideosToday = 0;

  videos.forEach((video) => {

    const videoDate = new Date(
      video.lastWatched
    ).toDateString();

    if (
      videoDate === today &&
      video.category === "Study"
    ) {

      focusTimeToday += video.watchTime;

    }

  });

  return {

    studyMode: settings.studyMode,

    blockedVideosToday,

    focusTimeToday,

  };

};

module.exports = {

  getStudyModeStatusService,

};