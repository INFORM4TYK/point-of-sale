import type { CartProduct, Product } from "../types/Product";
import api from "../config/api";

export const getCartItems = async ({
  cartId,
}: {
  cartId: number;
}): Promise<CartProduct[]> => {
  try {
    const { data } = await api.get<{ data: CartProduct[] }>(`/cart/${cartId}`);
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};

export const addItemToCart = async ({
  productId,
  amount,
  cartId,
}: {
  productId: number;
  amount: number;
  cartId: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.post<{ data: Product[] }>(`/cart/${cartId}`, {
      productId,
      amount,
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const removeItemFromCart = async ({
  productId,
  cartId,
}: {
  productId: number;
  cartId: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.delete<{ data: Product[] }>(
      `/cart/${cartId}/product/${productId}`
    );
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const updateItemToCart = async ({
  productId,
  updated_amount,
  cartId,
}: {
  productId: number;
  updated_amount: number;
  cartId: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.put<{ data: Product[] }>(`/cart/${cartId}`, {
      productId,
      amount: updated_amount,
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const getCartTotal = async ({
  cartId,
}: {
  cartId: number;
}): Promise<number> => {
  try {
    const { data } = await api.get<{ total: number }>(`/cart/total/${cartId}`);

    return data.total;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const clearCart = async ({
  cartId,
}: {
  cartId: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.delete<{ data: Product[] }>(`/cart/${cartId}`);
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
