import Product from "../models/products.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE
export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// GET ALL
export const getProducts = catchAsync(async (req, res) => {
  const products = await Product.find()
    .populate("category_id")
    .populate("supplier_id");
  res.json({ success: true, products });
});

// GET ONE
export const getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category_id")
    .populate("supplier_id");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ success: true, product });
});

// UPDATE
export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ success: true, message: "Product updated", product });
});

// DELETE
export const deleteProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Product deleted" });
});
