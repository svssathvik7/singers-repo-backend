const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    singerName: {
      type: String,
      required: true,
    },
    musicDirector: {
      type: String,
      required: true,
    },
    actualPitch: {
      type: String,
      required: true,
    },
    practisedPitch: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);
