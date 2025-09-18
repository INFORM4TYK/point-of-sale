import { Product } from "../types/Product";
import { HttpError } from "../utils/httpError";

import {
  addItemToCart,
  clearCart,
  getCartItems,
  getCartTotal,
  removeItemFromCart,
  updateItemAmount,
} from "../models/cartModel";

export const getAllCartItemsService = async (): Promise<Product[]> => {
  try {
    return await getCartItems();
  } catch (err) {
    throw new HttpError(500, "cart/failed-fetch-cart-items");
  }
};
export const addCartItemService = async (
  productId: number,
  amount: number
): Promise<void> => {
  try {
    await addItemToCart(productId, amount);
  } catch (err) {
    throw new HttpError(500, "cart/failed-add-item");
  }
};
export const updateCartItemService = async (
  productId: string,
  amount: number
): Promise<void> => {
  try {
    await updateItemAmount(productId, amount);
  } catch (err) {
    throw new HttpError(500, "cart/failed-update-item");
  }
};
export const removeCartItemService = async (
  productId: string
): Promise<void> => {
  try {
    await removeItemFromCart(productId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-remove-item");
  }
};
export const clearCartService = async (): Promise<void> => {
  try {
    await clearCart();
  } catch (err) {
    throw new HttpError(500, "cart/failed-clear-cart");
  }
};
export const getCartTotalService = async (): Promise<number> => {
  try {
    return await getCartTotal();
  } catch (err) {
    throw new HttpError(500, "cart/failed-fetch-total");
  }
};