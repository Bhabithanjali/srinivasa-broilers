const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ CREATE order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
