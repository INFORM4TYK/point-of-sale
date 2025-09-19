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

export const getAllCartItemsService = async (
  cartId: number
): Promise<Product[]> => {
  try {
    return await getCartItems(cartId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-fetch-cart-items");
  }
};
export const addCartItemService = async (
  productId: number,
  amount: number,
  cartId: number
): Promise<void> => {
  try {
    await addItemToCart(productId, amount, cartId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-add-item");
  }
};
export const updateCartItemService = async (
  productId: string,
  amount: number,
  cartId: number
): Promise<void> => {
  try {
    await updateItemAmount(productId, amount, cartId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-update-item");
  }
};
export const removeCartItemService = async (
  productId: string,
  cartId: number
): Promise<void> => {
  try {
    await removeItemFromCart(productId, cartId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-remove-item");
  }
};
export const clearCartService = async (cartId: number): Promise<void> => {
  try {
    await clearCart(cartId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-clear-cart");
  }
};
export const getCartTotalService = async (cartId: number): Promise<number> => {
  try {
    return await getCartTotal(cartId);
  } catch (err) {
    throw new HttpError(500, "cart/failed-fetch-total");
  }
};
