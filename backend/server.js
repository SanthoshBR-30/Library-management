const express = require("express");
const connectDB = require("./config/db");

const textbookRoutes = require("./routes/textbookRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/textbooks", textbookRoutes);
app.use("/api/paytm", paymentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
