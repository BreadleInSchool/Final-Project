import Order from "../models/orders.js";
import Product from "../models/products.js";
import Customer from "../models/customer.js";
import catchAsync from "../utils/catchAsync.js";

export const getDashboardStats = catchAsync(async (req, res) => {
  const [orderCount, productCount, customerCount] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    Customer.countDocuments(),
  ]);

  res.json({
    success: true,
    stats: {
      orders: orderCount,
      products: productCount,
      customers: customerCount,
    },
  });
});
