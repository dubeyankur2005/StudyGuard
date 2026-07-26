const {
  getStudyModeStatusService,
} = require("../services/studyModeService");

async function getStudyModeStatus(req, res) {

  try {

    const data = await getStudyModeStatusService();

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch Study Mode status.",
    });

  }

}

module.exports = {
  getStudyModeStatus,
};