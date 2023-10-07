const mongoose = require("mongoose");

const articlesDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true }
})

module.exports = articlesDetailsSchema;