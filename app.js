const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("./app/config/db-setup/db.config");

const authRouter = require("./app/routes/auth.routes");

const app = express();

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
  }

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/company", authRouter);

module.exports = app;