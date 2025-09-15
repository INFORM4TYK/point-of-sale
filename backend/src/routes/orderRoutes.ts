import { Router } from "express";
import { createOrderController, getOrderController } from "../controller/orderController";

const router = Router();

router.post("/", createOrderController);      
router.get("/:id", getOrderController);       

export default router;