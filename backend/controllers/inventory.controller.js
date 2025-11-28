import Inventory from "../models/inventory.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE
export const createInventory = catchAsync(async (req, res) => {
  const item = await Inventory.create(req.body);
  res.status(201).json({ success: true, item });
});

// READ ALL
export const getInventory = catchAsync(async (req, res) => {
  const items = await Inventory.find().populate("product_id");
  res.json({ success: true, items });
});

// READ ONE
export const getInventoryItem = catchAsync(async (req, res) => {
  const item = await Inventory.findById(req.params.id).populate("product_id");
  if (!item) return res.status(404).json({ message: "Inventory item not found" });
  res.json({ success: true, item });
});

// UPDATE
export const updateInventory = catchAsync(async (req, res) => {
  const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ message: "Inventory item not found" });
  res.json({ success: true, message: "Inventory updated", item });
});

// DELETE
export const deleteInventory = catchAsync(async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Inventory deleted" });
});
