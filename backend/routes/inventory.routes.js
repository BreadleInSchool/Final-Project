const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventoryController");

router.post("/", controller.createInventory);
router.get("/", controller.getInventory);
router.get("/:id", controller.getInventoryItem);
router.put("/:id", controller.updateInventory);
router.delete("/:id", controller.deleteInventory);

module.exports = router;
