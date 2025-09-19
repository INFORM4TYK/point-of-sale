import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
} from "../controller/orderController";

const router = Router();

router.get("/", getAllOrdersController);
router.get("/:orderId", getOrderByIdController);
router.post("/:orderId", createOrderController);
router.put("/:orderId", updateOrderController);
router.delete("/:orderId", deleteOrderController);

export default router;
