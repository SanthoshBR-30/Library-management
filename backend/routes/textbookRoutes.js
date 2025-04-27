const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const dotenv = require("dotenv");
const Textbook = require("../models/textbookModel");

const router = express.Router();
dotenv.config();

let gfs;
const db = mongoose.connection;

db.once("open", () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("✅ GridFS initialized in textbookRoutes.js");
});

module.exports = (upload) => {
  // GET /api/textbooks


  router.post("/upload", upload.single("textbook"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const textbook = new Textbook({
        filename: req.file.filename,
        fileId: req.file.id,
        contentType: req.file.contentType,
        syllabusScheme: req.body.syllabusScheme,
        college: req.body.college,
        department: req.body.department,
        semester: req.body.semester,
        subject: req.body.subject,
      });

      await textbook.save();

      res.status(200).json({
        message: "File uploaded successfully",
        file,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const textbooks = await Textbook.find(); // or add query filters
      res.status(200).json(textbooks);
    } catch (err) {
      console.error("Fetching textbooks failed:", err);
      res.status(500).json({ error: "Failed to fetch textbooks" });
    }
  });

  router.get("/download/:filename", async (req, res) => {
    try {
      if (!gfs) {
        return res.status(500).send("GridFS not initialized");
      }

      const file = await gfs.files.findOne({ filename: req.params.filename });

      if (!file) {
        return res.status(404).send("File not found");
      }

      const readStream = gfs.createReadStream(file.filename);

      res.setHeader("Content-Type", file.contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);

      readStream.pipe(res);
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).send("Error downloading file");
    }
  });

  return router;
};