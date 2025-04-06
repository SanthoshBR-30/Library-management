    const mongoose = require("mongoose");

    const TextbookSchema = new mongoose.Schema({
    filename: String,
    fileId: mongoose.Schema.Types.ObjectId,
    contentType: String,
    syllabusScheme: String,
    college: String,
    department: String,
    semester: String,
    subject: String,
    uploadedAt: { type: Date, default: Date.now },
    });

    module.exports = mongoose.model("Textbook", TextbookSchema);