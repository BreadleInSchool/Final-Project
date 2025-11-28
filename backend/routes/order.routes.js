import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Authenticated users (customer/admin can view and create)
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);
router.post("/", protect, createOrder);

// Admin only
router.put("/:id", protect, authorize(["admin"]), updateOrder);
router.delete("/:id", protect, authorize(["admin"]), deleteOrder);

export default router;
