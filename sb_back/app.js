import createError from "http-errors";
import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import usersRouter from "./routes/users";
import connect from "./schemas/index.js";

const app = express();
connect();

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(helmet());

app.use("/api", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
