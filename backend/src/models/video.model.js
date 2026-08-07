const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    channel: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },

    watchTime: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      enum: ["Study", "Entertainment"],
      required: true,
    },

    url: {
      type: String,
      default: "",
    },

    watchedAt: {
      type: Date,
      default: Date.now,
    },

    lastWatched: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

const getAllVideos = async () => {
  return await Video.find().sort({ watchedAt: -1 });
};

const saveVideo = async (videoData) => {
  return await Video.create(videoData);
};

const updateVideo = async (id, updatedData) => {
  return await Video.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

const deleteVideo = async (id) => {
  return await Video.findByIdAndDelete(id);
};

const getVideosByCategory = async (category) => {
  return await Video.find({ category });
};

const getVideosByChannel = async (channel) => {
  return await Video.find({ channel });
};

const getVideosByDate = async (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return await Video.find({
    watchedAt: {
      $gte: start,
      $lte: end,
    },
  });
};

module.exports = {
  getAllVideos,
  saveVideo,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
  getVideosByChannel,
  getVideosByDate,
};