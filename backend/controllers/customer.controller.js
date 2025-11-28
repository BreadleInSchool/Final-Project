import Customer from "../models/customer.js";
import Admin from "../models/Admin.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE
export const createCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({ success: true, customer });
});

// READ ALL
export const getCustomers = catchAsync(async (req, res) => {
  // If requester is admin, return full records
  if (req.user && req.user._id && req.user.email) {
    // Check if admin (has all admin fields or came from Admin model)
    const isAdmin = await Admin.findById(req.user._id);
    if (isAdmin) {
      const customers = await Customer.find();
      return res.json({ success: true, customers });
    }
  }

  // Public: return sanitized fields only
  const customers = await Customer.find().select("username first_name last_name created_at");
  res.json({ success: true, customers });
});

// READ ONE
export const getCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  // If authenticated as the customer or admin, show full record
  if (req.user && req.user._id.toString() === customer._id.toString()) {
    return res.json({ success: true, customer });
  }

  // Public: return sanitized fields only
  const publicView = {
    _id: customer._id,
    username: customer.username,
    first_name: customer.first_name,
    last_name: customer.last_name,
    created_at: customer.created_at,
  };

  res.json({ success: true, customer: publicView });
});

// UPDATE
export const updateCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  if (req.user && req.user._id.toString() !== customer._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(customer, req.body);
  await customer.save();

  res.json({ success: true, customer });
});

// DELETE
export const deleteCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  if (req.user && req.user._id.toString() !== customer._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Customer deleted" });
});
