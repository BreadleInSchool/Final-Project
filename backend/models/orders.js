import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  order_date: { type: Date, default: Date.now },
  order_status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  total_amount: { type: Number, required: true },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  payment_method: String,
  shipping_address: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
