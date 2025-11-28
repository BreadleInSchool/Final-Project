import express from "express";
import {
  createInventory,
  getInventory,
  getInventoryItem,
  updateInventory,
  deleteInventory,
} from "../controllers/inventory.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public read
router.get("/", getInventory);
router.get("/:id", getInventoryItem);

// Admin only
router.post("/", protect, authorize(["admin"]), createInventory);
router.put("/:id", protect, authorize(["admin"]), updateInventory);
router.delete("/:id", protect, authorize(["admin"]), deleteInventory);

export default router;
