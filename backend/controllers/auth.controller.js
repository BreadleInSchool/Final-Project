import Customer from "../models/customer.js";
import Admin from "../models/Admin.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken } from "../utils/generateToken.js";

// ADMIN LOGIN
export const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required" });

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password)))
    return res.status(400).json({ message: "Invalid admin credentials" });

  res.json({
    success: true,
    message: "Admin login successful",
    admin: { _id: admin._id, email: admin.email, role: "admin" },
    token: generateToken(admin._id),
  });
});

// CUSTOMER REGISTRATION
export const registerCustomer = catchAsync(async (req, res) => {
  const { username, email, password, first_name, last_name, phone, address } =
    req.body;

  const exists = await Customer.findOne({ $or: [{ email }, { username }] });
  if (exists)
    return res
      .status(400)
      .json({ message: "Email or username already exists" });

  const customer = await Customer.create({
    username,
    email,
    password,
    first_name,
    last_name,
    phone,
    address,
  });

  res.json({
    success: true,
    message: "Customer registered successfully",
    customer: {
      _id: customer._id,
      username: customer.username,
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      address: customer.address
    },
    token: generateToken(customer._id),
  });
});

// CUSTOMER LOGIN
export const loginCustomer = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required" });

  const customer = await Customer.findOne({ email });
  if (!customer || !(await customer.matchPassword(password)))
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    success: true,
    message: "Login successful",
    customer: {
      _id: customer._id,
      username: customer.username,
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      address: customer.address
    },
    token: generateToken(customer._id),
  });
});
