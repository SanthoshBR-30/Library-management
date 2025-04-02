const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const textbookRoutes = require("./routes/textbookRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/textbooks", textbookRoutes);
app.use("/api/paytm", paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));