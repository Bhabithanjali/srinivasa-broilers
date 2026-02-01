const router = require('express').Router();
const Order = require('../models/Order');

// create order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// update status
router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

// delete order
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
