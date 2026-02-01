const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Srinivasa Broilers API is running 🚀");
});

// ✅ Health check (Render needs this)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ MongoDB connection (SAFE)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err.message);
  });

// ✅ Routes
const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

// ✅ IMPORTANT: use Render's PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
