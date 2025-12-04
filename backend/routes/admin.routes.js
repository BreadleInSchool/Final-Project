import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { loginAdmin } from "../controllers/auth.controller.js"; // Assuming this exists or we need to create it

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/stats", protect, authorize(["admin"]), getDashboardStats);

export default router;
