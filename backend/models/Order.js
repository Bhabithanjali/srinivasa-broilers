const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    hensCount: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: String,
    },
    address: {
      type: String,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
