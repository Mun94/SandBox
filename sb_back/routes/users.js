const express = require("express");
const User = require("../schemas/user.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const result = await User.update(
      {
        channelId: req.params.id,
      },
      {
        videoCount: req.body.videoCount,
      }
    );
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

module.exports = router;
