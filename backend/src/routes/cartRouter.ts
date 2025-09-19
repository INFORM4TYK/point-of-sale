import { Router } from "express";
import {
  getCartItemsController,
  addCartItemController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
  getCartTotalController,
} from "../controller/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/:cartId",authMiddleware,  getCartItemsController);
router.post("/:cartId",authMiddleware,  addCartItemController);
router.put("/:cartId", authMiddleware, updateCartItemController);
router.delete("/:cartId/product/:productId",authMiddleware,  removeCartItemController);
router.delete("/:cartId",authMiddleware,  clearCartController);
router.get("/total/:cartId",authMiddleware, getCartTotalController);

export default router;
