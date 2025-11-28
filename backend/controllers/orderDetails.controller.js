const OrderDetails = require("../models/orderDetails");

// CREATE
exports.createOrderDetails = async (req, res) => {
  try {
    const detail = await OrderDetails.create(req.body);
    res.json(detail);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ALL
exports.getOrderDetails = async (req, res) => {
  try {
    const details = await OrderDetails.find()
      .populate("orderId")
      .populate("productId");
    res.json(details);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ONE
exports.getOrderDetail = async (req, res) => {
  try {
    const detail = await OrderDetails.findById(req.params.id)
      .populate("orderId")
      .populate("productId");
    res.json(detail);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// UPDATE
exports.updateOrderDetails = async (req, res) => {
  try {
    const detail = await OrderDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(detail);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE
exports.deleteOrderDetails = async (req, res) => {
  try {
    await OrderDetails.findByIdAndDelete(req.params.id);
    res.json({ message: "Order detail deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
