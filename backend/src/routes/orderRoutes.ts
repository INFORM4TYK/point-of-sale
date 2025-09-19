import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
  markOrderAsPaidController,
  updateOrderController,
} from "../controller/orderController";

const router = Router();

router.get("/", getAllOrdersController);
router.get("/:orderId", getOrderByIdController);
router.post("/:orderId", createOrderController);
router.put("/:orderId", updateOrderController);
router.put("/:orderId/paid", markOrderAsPaidController);
router.delete("/:orderId", deleteOrderController);

export default router;
