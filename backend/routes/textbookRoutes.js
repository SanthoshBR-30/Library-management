const express = require("express");
const cors = require("cors");
const textbookRoutes = require("./routes/textbookRoutes"); // Ensure the correct path

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/textbooks", textbookRoutes); // Check the base path

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
