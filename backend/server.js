const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose"); // Import mongoose here
const textbookRoutes = require("./routes/textbookRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const createUploadMiddleware = require("./middleware/uploadMiddleware"); // Import middleware creation

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: 'http://localhost:5003',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables.");
    }
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongoose connected to MongoDB in server.js");

    const upload = await createUploadMiddleware(); // Initialize upload middleware

    app.use("/api/textbooks", textbookRoutes(upload)); // Pass upload middleware
    app.use("/api/paytm", paymentRoutes);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();