const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, phone } = req.body;
    const order = await Order.create({
      user: req.user.id, items, totalAmount, address, phone
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
};

exports.allOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user','name email')
    .sort({ createdAt: -1 });
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true }
  );
  res.json(order);
};
