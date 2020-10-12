import mongoose from "mongoose";
require("dotenv").config();

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error) {
          console.error("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };

  connect();

  mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.once("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 다시 시도합니다.");
    connect();
  });

  require("./user");
};
