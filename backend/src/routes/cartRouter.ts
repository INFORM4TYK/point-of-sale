import { Router } from "express";
import {
  getCartItemsController,
  addCartItemController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
  getCartTotalController,
} from "../controller/cartController";

const router = Router();

router.get("/", getCartItemsController);
router.post("/", addCartItemController);
router.put("/", updateCartItemController);
router.delete("/:productId", removeCartItemController);
router.delete("/", clearCartController);
router.get("/total", getCartTotalController);

export default router;
