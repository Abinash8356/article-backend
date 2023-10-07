const mongoose = require("mongoose");
const articlesDetailsSchema = require("../models/articles.model");
const usersDetailsSchema = require("../models/user.model");

const mongoURI = `mongodb://localhost:27017/articles`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB Connected...");
});

db.on("error", (err) => {
  console.error("Error: ", err);
});

const usersDetailsModel = mongoose.model(
  "employeesDetails",
  usersDetailsSchema
);
const articlesDetailsModel = mongoose.model(
  "articlesDetails",
  articlesDetailsSchema
);

module.exports = { usersDetailsModel, articlesDetailsModel };
