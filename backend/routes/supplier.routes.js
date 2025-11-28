import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public read
router.get("/", getSuppliers);
router.get("/:id", getSupplier);

// Admin only
router.post("/", protect, authorize(["admin"]), createSupplier);
router.put("/:id", protect, authorize(["admin"]), updateSupplier);
router.delete("/:id", protect, authorize(["admin"]), deleteSupplier);

export default router;
