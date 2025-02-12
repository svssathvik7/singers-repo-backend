const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Genre", genreSchema);
