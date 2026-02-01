const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

// Root route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Srinivasa Broilers API is running 🚀");
});

// Health check (VERY IMPORTANT)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// ✅ DO NOT hardcode port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
