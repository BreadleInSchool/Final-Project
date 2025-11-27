import User from "../models/User.js";
import Customer from "../models/customer.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken } from "../utils/generateToken.js";

// CUSTOMER REGISTRATION
export const registerCustomer = catchAsync(async (req, res) => {
  const { username, email, password, first_name, last_name, phone, address } =
    req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists)
    return res
      .status(400)
      .json({ message: "Email or username already exists" });

  const user = await User.create({
    username,
    email,
    password,
    first_name,
    last_name,
    role: "customer",
  });

  const customer = await Customer.create({
    user_id: user._id,
    first_name,
    last_name,
    phone,
    address,
  });

  res.status(201).json({
    success: true,
    message: "Customer registered successfully",
    user: { _id: user._id, username: user.username, email: user.email },
    token: generateToken(user._id),
  });
});

// CUSTOMER LOGIN
export const loginCustomer = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required" });

  const user = await User.findOne({ email, role: "customer" });
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    success: true,
    message: "Login successful",
    user: { _id: user._id, username: user.username, email: user.email },
    token: generateToken(user._id),
  });
});
