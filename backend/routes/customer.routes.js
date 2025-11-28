import express from "express";
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Create profile: authenticated users (customers) can create their profile
router.post("/", protect, authorize(["customer", "admin"]), createCustomer);

// List customers: public (sanitized)
router.get("/", getCustomers);

// Get single: public (sanitized), admins/owners get full
router.get("/:id", getCustomer);

// Update: admin or owner
router.put("/:id", protect, authorize(["admin", "customer"]), updateCustomer);

// Delete: admin or owner
router.delete("/:id", protect, authorize(["admin", "customer"]), deleteCustomer);

export default router;
