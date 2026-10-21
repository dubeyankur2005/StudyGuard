const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    videoId: {
      type: String,
      required: true,
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

videoSchema.index({ owner: 1, videoId: 1 }, { unique: true });
const Video = mongoose.model("Video", videoSchema);

const getAllVideos = async (owner) => {
  return Video.find({ owner }).sort({ watchedAt: -1 });
};

const saveVideo = async (videoData) => {
  return await Video.create(videoData);
};

const updateVideo = async (id, owner, updatedData) => {
  const allowedFields = ["title", "channel", "thumbnail", "duration", "watchTime", "category", "url"];
  const safeData = Object.fromEntries(Object.entries(updatedData || {}).filter(([key]) => allowedFields.includes(key)));
  return await Video.findOneAndUpdate({ _id: id, owner }, safeData, {
    new: true,
    runValidators: true,
  });
};

const deleteVideo = async (id, owner) => {
  return await Video.findOneAndDelete({ _id: id, owner });
};

const getVideosByCategory = async (category, owner) => {
  return await Video.find({ category, owner });
};

const getVideosByChannel = async (channel, owner) => {
  return await Video.find({ channel, owner });
};

const getVideosByDate = async (date, owner) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return await Video.find({
    owner,
    watchedAt: {
      $gte: start,
      $lte: end,
    },
  });
};

module.exports = {
  Video,
  getAllVideos,
  saveVideo,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
  getVideosByChannel,
  getVideosByDate,
};
