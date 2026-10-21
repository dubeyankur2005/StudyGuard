const reportService = require("../services/report.service");

const getWeeklyReport = async (req, res, next) => {
  try {
    const report = await reportService.getWeeklyReport(req.user._id);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

const exportCSV = async (req, res, next) => {
  try {
    const csv = await reportService.exportCSV(req.user._id);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=weekly-report.csv"
    );

    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

const exportPDF = async (req, res, next) => {
  try {
    const pdfBuffer = await reportService.exportPDF(req.user._id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=weekly-report.pdf"
    );

    res.status(200).send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeeklyReport,
  exportCSV,
  exportPDF,
};
