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

router.get("/:cartId", getCartItemsController);
router.post("/:cartId", addCartItemController);
router.put("/:cartId", updateCartItemController);
router.delete("/:cartId/product/:productId", removeCartItemController);
router.delete("/:cartId", clearCartController);
router.get("/total/:cartId", getCartTotalController);

export default router;
