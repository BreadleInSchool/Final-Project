const Customer = require("../models/customer");

// CREATE
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ALL
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ONE
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// UPDATE
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(customer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
