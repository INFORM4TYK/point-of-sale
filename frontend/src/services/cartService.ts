import type { CartProduct, Product } from "../types/Product";
import api from "../config/api";

export const getCartItems = async (): Promise<CartProduct[]> => {
  try {
    const { data } = await api.get<{ data: CartProduct[] }>("/cart/", {});
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};

export const addItemToCart = async ({
  productId,
  amount,
}: {
  productId: number;
  amount: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.post<{ data: Product[] }>("/cart/", {
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
}: {
  productId: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.delete<{ data: Product[] }>(
      `/cart/${productId}`,
      {}
    );
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const updateItemToCart = async ({
  productId,
  updated_amount,
}: {
  productId: number;
  updated_amount: number;
}): Promise<Product[]> => {
  try {
    const { data } = await api.put<{ data: Product[] }>("/cart/", {
      productId,
      amount: updated_amount,
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const getCartTotal = async (): Promise<number> => {
  try {
    const { data } = await api.get<{ total: number }>("/cart/total", {});

    return data.total;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
export const clearCart = async (): Promise<Product[]> => {
  try {
    const { data } = await api.delete<{ data: Product[] }>("/cart", {});
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
