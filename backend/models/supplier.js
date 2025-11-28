import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplier_name: { type: String, required: true },
  contact_person: String,
  email: String,
  phone: String,
  address: String,
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Supplier", supplierSchema);
