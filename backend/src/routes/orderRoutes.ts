import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
  markOrderAsPaidController,
  updateOrderController,
} from "../controller/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllOrdersController);
router.get("/:orderId", authMiddleware, getOrderByIdController);
router.post("/:orderId", authMiddleware, createOrderController);
router.put("/:orderId", authMiddleware, updateOrderController);
router.put("/:orderId/paid",authMiddleware,  markOrderAsPaidController);
router.delete("/:orderId", authMiddleware, deleteOrderController);

export default router;
