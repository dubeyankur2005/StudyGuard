const analyticsService = require("../services/analytics.service");

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getDashboardAnalytics();

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
    const analytics = await analyticsService.getDailyAnalytics();

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
    const analytics = await analyticsService.getWeeklyAnalytics();

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
    const analytics = await analyticsService.getMonthlyAnalytics();

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
      await analyticsService.getTopSubjects();

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