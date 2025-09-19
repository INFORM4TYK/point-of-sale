import { Request, Response, NextFunction } from "express";
import {
  addCartItemService,
  clearCartService,
  getAllCartItemsService,
  getCartTotalService,
  removeCartItemService,
  updateCartItemService,
} from "../services/cartService";

export const getCartItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId);

    const items = await getAllCartItemsService(cartId);
    res.status(200).json({ data: items });
  } catch (err) {
    next(err);
  }
};
export const addCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId);

    const { productId, amount } = req.body;
    console.log("💀 ~ addCartItemController ~ productId:", productId);
    await addCartItemService(productId, amount, cartId);
    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    next(err);
  }
};
export const updateCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId);

    const { productId, amount } = req.body;
    await updateCartItemService(productId, amount, cartId);
    res.status(200).json({ message: "Cart item updated" });
  } catch (err) {
    next(err);
  }
};
export const removeCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const cartId = Number(req.params.cartId);
    await removeCartItemService(productId, cartId);
    res.status(200).json({ message: "Cart item removed" });
  } catch (err) {
    next(err);
  }
};
export const clearCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId);

    await clearCartService(cartId);
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
};
export const getCartTotalController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId);

    const total = await getCartTotalService(cartId);
    console.log("💀 ~ getCartTotalController ~ total:", total);
    res.status(200).json({ total });
  } catch (err) {
    next(err);
  }
};