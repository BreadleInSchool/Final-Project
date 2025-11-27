import User from "../models/User.js";
import Admin from "../models/Admin.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken } from "../utils/generateToken.js";

// ADMIN REGISTRATION (only by existing admins)
export const registerAdmin = catchAsync(async (req, res) => {
  const { username, email, password, full_name, role } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists)
    return res
      .status(400)
      .json({ message: "Email or username already exists" });

  const user = await User.create({
    username,
    email,
    password,
    first_name: full_name?.split(" ")[0],
    last_name: full_name?.split(" ")[1],
    role: "admin",
  });

  const admin = await Admin.create({
    user_id: user._id,
    role: role || "admin",
    is_active: true,
  });

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    user: { _id: user._id, username: user.username, email: user.email },
    token: generateToken(user._id),
  });
});

// ADMIN LOGIN
export const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required" });

  const user = await User.findOne({ email, role: "admin" });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid admin credentials" });

  const admin = await Admin.findOne({ user_id: user._id });
  if (!admin || !admin.is_active)
    return res.status(403).json({ message: "Admin account is inactive" });

  // Update last login
  admin.last_login = new Date();
  await admin.save();

  res.json({
    success: true,
    message: "Admin login successful",
    user: { _id: user._id, username: user.username, email: user.email },
    admin: { role: admin.role },
    token: generateToken(user._id),
  });
});

// GET ALL ADMINS (admin only)
export const getAllAdmins = catchAsync(async (req, res) => {
  const admins = await Admin.find()
    .populate("user_id", "username email first_name last_name")
    .select("-__v");

  res.json({
    success: true,
    count: admins.length,
    admins,
  });
});

// GET SINGLE ADMIN (admin only)
export const getAdminById = catchAsync(async (req, res) => {
  const admin = await Admin.findById(req.params.id).populate(
    "user_id",
    "username email first_name last_name"
  );

  if (!admin)
    return res.status(404).json({ message: "Admin not found" });

  res.json({
    success: true,
    admin,
  });
});

// UPDATE ADMIN (admin only)
export const updateAdmin = catchAsync(async (req, res) => {
  const { role, is_active } = req.body;

  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { role, is_active },
    { new: true }
  ).populate("user_id", "username email first_name last_name");

  if (!admin)
    return res.status(404).json({ message: "Admin not found" });

  res.json({
    success: true,
    message: "Admin updated successfully",
    admin,
  });
});

// DELETE ADMIN (admin only)
export const deleteAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);

  if (!admin)
    return res.status(404).json({ message: "Admin not found" });

  // Optionally delete the associated user
  await User.findByIdAndDelete(admin.user_id);

  res.json({
    success: true,
    message: "Admin deleted successfully",
  });
});
