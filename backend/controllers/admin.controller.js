import Admin from "../models/Admin.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken } from "../utils/generateToken.js";

// ADMIN REGISTRATION (only by existing admins)
export const registerAdmin = catchAsync(async (req, res) => {
  const { username, email, password, full_name, role } = req.body;

  const exists = await Admin.findOne({ $or: [{ email }, { username }] });
  if (exists)
    return res
      .status(400)
      .json({ message: "Email or username already exists" });

  const admin = await Admin.create({
    username,
    email,
    password,
    full_name,
    role: role || "admin",
    is_active: true,
  });

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    admin: { _id: admin._id, username: admin.username, email: admin.email, role: admin.role },
    token: generateToken(admin._id),
  });
});

// ADMIN LOGIN
export const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required" });

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password)))
    return res.status(401).json({ message: "Invalid admin credentials" });

  if (!admin.is_active)
    return res.status(403).json({ message: "Admin account is inactive" });

  // Update last login
  admin.last_login = new Date();
  await admin.save();

  res.json({
    success: true,
    message: "Admin login successful",
    admin: { _id: admin._id, username: admin.username, email: admin.email, role: admin.role },
    token: generateToken(admin._id),
  });
});

// GET ALL ADMINS (admin only)
export const getAllAdmins = catchAsync(async (req, res) => {
  const admins = await Admin.find().select("-password");

  res.json({
    success: true,
    count: admins.length,
    admins,
  });
});

// GET SINGLE ADMIN (admin only)
export const getAdminById = catchAsync(async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");

  if (!admin)
    return res.status(404).json({ message: "Admin not found" });

  res.json({
    success: true,
    admin,
  });
});

// UPDATE ADMIN (admin only)
export const updateAdmin = catchAsync(async (req, res) => {
  const { role, is_active, full_name } = req.body;

  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { role, is_active, full_name },
    { new: true }
  ).select("-password");

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

  res.json({
    success: true,
    message: "Admin deleted successfully",
  });
});
