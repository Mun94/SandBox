import express from "express";
import {
  creatorUpload,
  videoCountPatch,
} from "../controllers/userController.js";
import routes from "./routes.js";

const router = express.Router();

router.get(routes.creatorUpload, creatorUpload);
router.patch(routes.videoCountPatch, videoCountPatch);

router.get("/ping", (req, res) => {
  return res.send("pong");
});

export default router;
