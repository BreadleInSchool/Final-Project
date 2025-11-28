import OrderDetail from "../models/orderDetails.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE
export const createOrderDetails = catchAsync(async (req, res) => {
  const detail = await OrderDetail.create(req.body);
  res.status(201).json({ success: true, detail });
});

// READ ALL
export const getOrderDetails = catchAsync(async (req, res) => {
  const details = await OrderDetail.find()
    .populate("order_id")
    .populate("product_id");
  res.json({ success: true, details });
});

// READ ONE
export const getOrderDetail = catchAsync(async (req, res) => {
  const detail = await OrderDetail.findById(req.params.id)
    .populate("order_id")
    .populate("product_id");
  if (!detail) return res.status(404).json({ message: "Order detail not found" });
  res.json({ success: true, detail });
});

// UPDATE
export const updateOrderDetails = catchAsync(async (req, res) => {
  const detail = await OrderDetail.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!detail) return res.status(404).json({ message: "Order detail not found" });
  res.json({ success: true, message: "Order detail updated", detail });
});

// DELETE
export const deleteOrderDetails = catchAsync(async (req, res) => {
  await OrderDetail.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Order detail deleted" });
});
