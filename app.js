const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("./app/db-setup/db.config");

const authRouter = require("./app/routes/auth.routes");
const articleRouter = require('./app/routes/article.routes');
const globalErrorHandler = require('./app/controllers/errorController');

const app = express();

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
  }

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/articles", articleRouter);

app.use(globalErrorHandler);

module.exports = app;