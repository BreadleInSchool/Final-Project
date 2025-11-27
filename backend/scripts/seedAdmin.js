import mongoose from "mongoose";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import config from "../config/index.js";
import dotenv from "dotenv";

dotenv.config();

// input "node scripts/seedAdmin.js" in terminal to run this script

async function seedAdmin() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@example.com",
      role: "admin",
    });

    if (existingAdmin) {
      console.log("⚠️  Admin already exists!");
      process.exit(0);
    }

    console.log("🔐 Creating admin user...");
    // Let the User model hash the password via pre-save hook
    const user = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: "admin123", // Password will be hashed by the model
      first_name: "Admin",
      last_name: "User",
      role: "admin",
    });

    console.log("📝 Creating admin profile...");
    await Admin.create({
      user_id: user._id,
      role: "admin",
      is_active: true,
    });

    console.log("\nAdmin created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email:    admin@example.com");
    console.log("Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seedAdmin();
