const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = createError();
  err.status = 404;
  err.message = "Sorry! We couldn't find the page you were looking for.";
  res.status(404).render("page-not-found", { err });
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.status !== 404) {
    err.status = 500;
    err.message = "Sorry! There was an unexpected error on the server.";
    res.render("error", { err });
  }
  console.error(`Error ${err.status}: ${err.message}`);
});

module.exports = app;
