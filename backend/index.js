const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ FIXED CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://192.168.56.1:3000",
    "https://srinivasa-broilers.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Srinivasa Broilers API is running 🚀");
});

// ✅ Health route
app.get("/health", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: "ok", db: "connected" });
  } else {
    res.status(503).json({ status: "starting", db: "connecting" });
  }
});

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err.message));

// ✅ Routes
const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
