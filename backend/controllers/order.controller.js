const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("products.product");
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET ONE ORDER
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("products.product");
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
