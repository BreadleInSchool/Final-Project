const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderDetailsController");

router.post("/", controller.createOrderDetails);
router.get("/", controller.getOrderDetails);
router.get("/:id", controller.getOrderDetail);
router.put("/:id", controller.updateOrderDetails);
router.delete("/:id", controller.deleteOrderDetails);

module.exports = router;
