import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  description: String,
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Category", categorySchema);
