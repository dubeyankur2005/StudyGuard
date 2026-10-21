const {
  getStudyModeStatusService,
} = require("../services/studyModeService");

async function getStudyModeStatus(req, res, next) {

  try {

    const data = await getStudyModeStatusService(req.user._id);

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    next(error);

  }

}

module.exports = {
  getStudyModeStatus,
};
