const mongoose = require("mongoose");

const TextbookSchema = new mongoose.Schema({
  filename: String,
  semester: String,
  subject: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Textbook", TextbookSchema);
