// const Grid = require("gridfs-stream");
// const mongoose = require("mongoose");

// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// exports.uploadTextbook = async (req, res) => {
//   try {
//     // Make sure file and metadata are available
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
    
//     // Add the metadata to the file
//     if (req.body.semester && req.body.subject) {
//       const fileId = req.file.id;
//       await gfs.files.updateOne(
//         { _id: fileId },
//         { $set: { 
//           metadata: {
//             semester: req.body.semester,
//             subject: req.body.subject,
//             college: req.body.college,
//             department: req.body.department,
//             syllabusScheme: req.body.syllabusScheme
//           }
//         }}
//       );
//     }
    
//     res.json({ file: req.file });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error during upload" });
//   }
// };

// exports.getTextbooks = async (req, res) => {
//   const { semester, subject } = req.query;
//   const files = await gfs.files.find({ "metadata.semester": semester, "metadata.subject": subject }).toArray();
//   res.json(files);
// };


const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const Textbook = require("../models/textbookModel"); // Import Textbook model

const conn = mongoose.createConnection(process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("✅ GridFS Initialized...");
});

// 📌 Upload textbook and save metadata
exports.uploadTextbook = async (req, res) => {
  try {
    console.log("📝 Upload Request Received");
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Save metadata in `Textbook` collection
    const textbook = new Textbook({
      filename: req.file.filename,
      semester: req.body.semester,
      subject: req.body.subject,
      college: req.body.college,
      department: req.body.department,
      syllabusScheme: req.body.syllabusScheme,
      price: req.body.price || 0, // If selling textbooks
    });

    await textbook.save(); // Save metadata in MongoDB
    
    res.status(201).json({ message: "✅ PDF uploaded successfully", file: req.file });
  } catch (error) {
    console.error("❌ Error uploading PDF:", error);
    res.status(500).json({ message: "Error uploading PDF", error });
  }
};
