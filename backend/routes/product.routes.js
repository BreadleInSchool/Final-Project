import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public read
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin only
router.post("/", protect, authorize(["admin"]), createProduct);
router.put("/:id", protect, authorize(["admin"]), updateProduct);
router.delete("/:id", protect, authorize(["admin"]), deleteProduct);

export default router;
