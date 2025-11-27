import Customer from "../models/Customer.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCustomers = catchAsync(async (req, res) => {
  const customers = await Customer.find();
  res.json({ success: true, customers });
});

export const createCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.json({ success: true, customer });
});
