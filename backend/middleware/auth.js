import jwt from "jsonwebtoken";
import config from "../config/index.js";
import Customer from "../models/customer.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Try to find user in Customer or Admin
    let user = await Customer.findById(decoded.id).select("-password");
    if (!user) {
      user = await Admin.findById(decoded.id).select("-password");
      if (user) user.role = "admin";
    } else {
      user.role = "customer";
    }
    
    if (!user) return res.status(401).json({ message: "User not found" });
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

// Role-based authorization middleware
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (allowedRoles.length === 0) return next();
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    next();
  };
};
