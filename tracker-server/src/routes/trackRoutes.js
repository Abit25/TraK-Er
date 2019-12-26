const express = require("express");
const mongoose = require("mongoose");
const Tracks = require("../models/Tracks");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/tracks", requireAuth, async (req, res) => {
  try {
    const tracks = await Tracks.find({ userId: req.user._id });
    res.send(tracks);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/tracks", requireAuth, async (req, res) => {
  try {
    const track = new Tracks(req.body);
    await track.save();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
