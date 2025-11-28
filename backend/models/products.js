import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: String,
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  unit_price: { type: Number, required: true },
  cost_price: { type: Number, required: true },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
