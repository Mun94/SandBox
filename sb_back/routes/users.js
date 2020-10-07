import express from "express";
import User from "../schemas/user.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.throw(500, e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const {
    params: { id },
    body: { videoCount },
  } = req;
  try {
    const result = await User.update(
      {
        channelId: id,
      },
      {
        videoCount: videoCount,
      }
    );
    res.json(result);
  } catch (e) {
    res.throw(500, e);
  }
});

module.exports = router;
