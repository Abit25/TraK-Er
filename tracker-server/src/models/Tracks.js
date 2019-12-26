const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  timestamp: {
    type: Number
  },
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: [pointSchema],
  name: {
    type: String,
    default: ""
  }
});

const Tracks = new mongoose.model("Tracks", trackSchema);

module.exports = Tracks;
