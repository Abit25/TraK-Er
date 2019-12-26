const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Email and Password are required X" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(422)
      .send({ error: "Please enter a valid Email and Password Y" });
  }
  console.log(user._id);
  try {
    console.log(user.email);
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    // console.log(err);
    return res
      .status(422)
      .send({ error: "Please enter a valid Email and Password" });
  }
});

module.exports = router;
