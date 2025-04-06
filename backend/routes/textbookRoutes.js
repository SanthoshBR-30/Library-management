// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// // const { GridFsStorage } = require("multer-gridfs-storage");
// const  GridFsStorage  = require("multer-gridfs-storage");
// const textbookController = require("../controllers/textbookController");

// // Create storage engine
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI || "mongodb://localhost:27017/textbookDB",
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   // file: (req, file) => {
//   //   return {
//   //     filename: Date.now() + '-' +file.originalname,
//   //     bucketName: "uploads",
//   //     metadata: {
//   //       semester: req.body.semester,
//   //       subject: req.body.subject,
//   //       college: req.body.college,
//   //       department: req.body.department,
//   //       syllabusScheme: req.body.syllabusScheme
//   //     }
//   //   };
//   // }
//   file: async (req, file) => {
//     try {
//       console.log("Inside file():", file.originalname);
//       return {
//         filename: Date.now() + '-' + file.originalname,
//         bucketName: "uploads",
//         metadata: {
//           semester: req.body.semester,
//           subject: req.body.subject,
//           college: req.body.college,
//           department: req.body.department,
//           syllabusScheme: req.body.syllabusScheme
//         }
//       };
//     } catch (err) {
//       console.error("Error in file():", err);
//       throw err;
//     }
//   }
  
// });

// const upload = multer({ storage });

// router.post("/upload", upload.single("textbook"), textbookController.uploadTextbook);

// router.get("/", textbookController.getTextbooks);

// module.exports = router;

const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const textbookController = require("../controllers/textbookController");
const { getNativeDb } = require("../config/db");

const router = express.Router();

// Create storage engine
const storage = new GridFsStorage({
  db: getNativeDb(),
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: "uploads",
      metadata: {
        semester: req.body.semester,
        subject: req.body.subject,
        college: req.body.college,
        department: req.body.department,
        syllabusScheme: req.body.syllabusScheme
      }
    };
  }
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("textbook"), textbookController.uploadTextbook);
router.get("/", textbookController.getTextbooks);

module.exports = router;