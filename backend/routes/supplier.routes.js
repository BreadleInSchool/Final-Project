const express = require("express");
const router = express.Router();
const controller = require("../controllers/supplierController");

router.post("/", controller.createSupplier);
router.get("/", controller.getSuppliers);
router.get("/:id", controller.getSupplier);
router.put("/:id", controller.updateSupplier);
router.delete("/:id", controller.deleteSupplier);

module.exports = router;
