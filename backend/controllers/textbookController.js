const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

exports.uploadTextbook = async (req, res) => {
  res.json({ file: req.file });
};

exports.getTextbooks = async (req, res) => {
  const { semester, subject } = req.query;
  const files = await gfs.files.find({ "metadata.semester": semester, "metadata.subject": subject }).toArray();
  res.json(files);
};
