import User from "../schemas/user.js";

export const creatorUpload = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    console.error(e);
    res.throw(500, e);
  }
};

export const creatorRegister = async (req, res) => {
  const {
    body: { channelId, name, videoCount, categoryId },
  } = req;
  try {
    const user = new User({
      channelId,
      name,
      videoCount,
      categoryId,
    });
    await user.save();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.throw(500, e);
  }
};

export const videoCountPatch = async (req, res) => {
  const {
    params: { id },
    body: { videoCount },
  } = req;
  try {
    await User.updateOne(
      {
        channelId: id,
      },
      {
        videoCount: videoCount,
      }
    );
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.throw(500, e);
  }
};
