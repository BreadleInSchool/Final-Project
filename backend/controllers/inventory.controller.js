const Inventory = require("../models/inventory");

// CREATE
exports.createInventory = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ALL
exports.getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().populate("product");
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// READ ONE
exports.getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate("product");
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// UPDATE
exports.updateInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE
exports.deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Inventory deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
