import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/database.js";
import config from "./config/index.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import orderRoutes from "./routes/order.routes.js";
import orderDetailsRoutes from "./routes/orderDetails.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";

// Import middleware
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = config.port;

// Middleware
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true, // Allow cookies to be sent
    allowedHeaders: "*",
    methods: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blataditz Retail API is running",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

// Category routes (GET public, POST/PUT/DELETE admin only)
app.use("/api/categories", categoryRoutes);

// Product routes (GET public, POST/PUT/DELETE admin only)
app.use("/api/products", productRoutes);

// Supplier routes (GET public, POST/PUT/DELETE admin only)
app.use("/api/suppliers", supplierRoutes);

// Order routes (GET/POST authenticated, PUT/DELETE admin only)
app.use("/api/orders", orderRoutes);

// OrderDetails routes (GET/POST authenticated, PUT/DELETE admin only)
app.use("/api/orderDetails", orderDetailsRoutes);

// Inventory routes (GET public, POST/PUT/DELETE admin only)
app.use("/api/inventory", inventoryRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${config.nodeEnv}`);
  });
});
