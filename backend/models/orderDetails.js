import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

export default mongoose.model("OrderDetail", orderDetailsSchema);
