import Order from "../models/orders.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE ORDER
export const createOrder = catchAsync(async (req, res) => {
  const orderData = {
    ...req.body,
    customer_id: req.user._id,
  };
  const order = await Order.create(orderData);
  res.status(201).json({ success: true, order });
});

// GET ALL ORDERS
export const getOrders = catchAsync(async (req, res) => {
  const orders = await Order.find()
    .populate("customer_id")
    .populate("order_date");
  res.json({ success: true, orders });
});

// GET ONE ORDER
export const getOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("customer_id")
    .populate("order_date");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ success: true, order });
});

// UPDATE ORDER
export const updateOrder = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ success: true, message: "Order updated", order });
});

// DELETE ORDER
export const deleteOrder = catchAsync(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Order deleted" });
});
