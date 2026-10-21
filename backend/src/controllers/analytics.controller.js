const analyticsService = require("../services/analytics.service");

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getDashboardAnalytics(req.user._id);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

const getDailyAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getDailyAnalytics(req.user._id);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

const getWeeklyAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getWeeklyAnalytics(req.user._id);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

const getMonthlyAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getMonthlyAnalytics(req.user._id);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

const getTopSubjects = async (req, res, next) => {
  try {

    const subjects =
      await analyticsService.getTopSubjects(req.user._id);

    res.status(200).json({
      success: true,
      data: subjects,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardAnalytics,
  getDailyAnalytics,
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getTopSubjects,
};
