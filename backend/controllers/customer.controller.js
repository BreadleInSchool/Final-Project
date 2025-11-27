import Customer from "../models/customer.js";
import catchAsync from "../utils/catchAsync.js";

// CREATE
export const createCustomer = catchAsync(async (req, res) => {
  // If user is authenticated, associate the customer profile with the user
  const payload = { ...req.body };
  if (req.user && req.user._id) payload.user_id = req.user._id;

  const customer = await Customer.create(payload);
  res.status(201).json({ success: true, customer });
});

// READ ALL
export const getCustomers = catchAsync(async (req, res) => {
  // If requester is admin, return full records
  if (req.user && req.user.role === "admin") {
    const customers = await Customer.find();
    return res.json({ success: true, customers });
  }

  // Public: return sanitized fields only
  const customers = await Customer.find().select("first_name last_name created_at");
  res.json({ success: true, customers });
});

// READ ONE
export const getCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  // Admins see full record
  if (req.user && req.user.role === "admin") {
    return res.json({ success: true, customer });
  }

  // If authenticated owner, show full record
  if (req.user && req.user._id && customer.user_id && customer.user_id.toString() === req.user._id.toString()) {
    return res.json({ success: true, customer });
  }

  // Public: return sanitized fields only
  const publicView = {
    _id: customer._id,
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

  if (req.user.role !== "admin") {
    if (!customer.user_id || customer.user_id.toString() !== req.user._id.toString())
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

  if (req.user.role !== "admin") {
    if (!customer.user_id || customer.user_id.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });
  }

  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Customer deleted" });
});
