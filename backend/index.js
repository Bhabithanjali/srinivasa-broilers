const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("Srinivasa Broilers API is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Orders API
app.use("/api/orders", require("./routes/orders"));

// ===== DATABASE CONNECTION =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
