import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", loginAdmin);

// Protected routes (admin only)
router.post("/register", protect, registerAdmin);
router.get("/", protect, getAllAdmins);
router.get("/:id", protect, getAdminById);
router.put("/:id", protect, updateAdmin);
router.delete("/:id", protect, deleteAdmin);

export default router;
