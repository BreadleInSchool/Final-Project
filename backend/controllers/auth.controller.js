import Customer from "../models/customer.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken } from "../utils/generateToken.js";

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

  res.status(201).json({
    success: true,
    message: "Customer registered successfully",
    customer: { _id: customer._id, username: customer.username, email: customer.email },
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
    customer: { _id: customer._id, username: customer.username, email: customer.email },
    token: generateToken(customer._id),
  });
});
