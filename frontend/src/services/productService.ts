import type { Product } from "../types/Product";
import api from "../config/api";

export const getProducts = async (): Promise<Product[]> => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await api.get<{ data: Product[] }>("/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};

export const searchProducts = async (name: string): Promise<Product[]> => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await api.get<{ data: Product[] }>(
      `/products/search?name=${encodeURIComponent(name)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data.data;
  } catch (err) {
    throw new Error("Failed to search products");
  }
};
