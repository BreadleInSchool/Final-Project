import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },
  stock_quantity: { type: Number, default: 0 },
  reorder_level: { type: Number, default: 10 },
  max_stock_level: { type: Number },
  last_restocked: Date,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Inventory", inventorySchema);
