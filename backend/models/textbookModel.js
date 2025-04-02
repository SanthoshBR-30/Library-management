const mongoose = require("mongoose");

const TextbookSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // GridFS filename
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  syllabusScheme: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  // price: { type: Number, required: true }, 
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

module.exports = mongoose.model("Textbook", TextbookSchema);
