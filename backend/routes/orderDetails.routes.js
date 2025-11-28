import express from "express";
import {
  createOrderDetails,
  getOrderDetails,
  getOrderDetail,
  updateOrderDetails,
  deleteOrderDetails,
} from "../controllers/orderDetails.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Authenticated users
router.get("/", protect, getOrderDetails);
router.get("/:id", protect, getOrderDetail);
router.post("/", protect, createOrderDetails);

// Admin only
router.put("/:id", protect, authorize(["admin"]), updateOrderDetails);
router.delete("/:id", protect, authorize(["admin"]), deleteOrderDetails);

export default router;
