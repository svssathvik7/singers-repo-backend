const express = require("express");
const router = express.Router();
const Genre = require("../models/Genre");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Song = require("../models/Song");

// Add a new genre for a user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, userId } = req.body;
    console.log(req.body);
    // Validate request body
    if (!title || !userId) {
      return res.status(400).json({ message: "Title and userId are required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new genre
    const genre = await Genre.create({
      title,
      user: userId,
    });

    res.status(201).json({
      message: "Genre created successfully",
      genre,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating genre",
      error: error.message,
    });
  }
});

// Add a new song to a genre
router.post("/songs", authMiddleware, async (req, res) => {
  try {
    const {
      songName,
      movieName,
      singerName,
      musicDirector,
      actualPitch,
      genreId,
      userId,
    } = req.body;

    // Validate required fields
    if (
      !songName ||
      !movieName ||
      !singerName ||
      !musicDirector ||
      !actualPitch ||
      !genreId ||
      !userId
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if genre exists and belongs to the user
    const genre = await Genre.findById(genreId);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    if (genre.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to add songs to this genre" });
    }

    // Create new song
    const song = await Song.create({
      songName,
      movieName,
      singerName,
      musicDirector,
      actualPitch,
      genre: genreId,
    });

    // Update genre's songs array
    genre.songs.push(song._id);
    await genre.save();

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating song",
      error: error.message,
    });
  }
});

module.exports = router;
