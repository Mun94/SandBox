const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  channelId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  videoCount: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
