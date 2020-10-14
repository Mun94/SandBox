import express from "express";
import {
  creatorUpload,
  creatorRegister,
  creatorDelete,
  videoCountPatch,
} from "../controllers/userController.js";
import routes from "./routes.js";

const router = express.Router();

router.get(routes.creatorUpload, creatorUpload);
router.post(routes.creatorRegister, creatorRegister);
router.delete(routes.creatorDelete,creatorDelete);
router.patch(routes.videoCountPatch, videoCountPatch);

router.get("/ping", (req, res) => {
  return res.send("pong");
});

export default router;
