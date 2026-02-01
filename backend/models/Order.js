const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: String,
  hensCount: String,
  deliveryTime: String,
  address: String,
  whatsapp: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
