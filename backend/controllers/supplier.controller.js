import Supplier from "../models/supplier.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE
export const createSupplier = catchAsync(async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json({ success: true, supplier });
});

// READ ALL
export const getSuppliers = catchAsync(async (req, res) => {
  const suppliers = await Supplier.find();
  res.json({ success: true, suppliers });
});

// READ ONE
export const getSupplier = catchAsync(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  res.json({ success: true, supplier });
});

// UPDATE
export const updateSupplier = catchAsync(async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  res.json({ success: true, message: "Supplier updated", supplier });
});

// DELETE
export const deleteSupplier = catchAsync(async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Supplier deleted" });
});
