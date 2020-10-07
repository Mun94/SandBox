import User from "../schemas/user.js";

export const creatorUpload = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.throw(500, e);
  }
};

export const videoCountPatch = async (req, res) => {
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
};
