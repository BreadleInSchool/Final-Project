const Supplier = require("../models/supplier");

// CREATE
exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.json(supplier);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ALL
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ONE
exports.getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// UPDATE
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(supplier);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
