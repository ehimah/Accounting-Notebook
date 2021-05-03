const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");

const routes = require("./routes");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./utils/error");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use(routes);

app.use(errorConverter);

// handle error
app.use(errorHandler);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
