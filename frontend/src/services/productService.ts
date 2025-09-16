import type { Product } from "../types/Product";
import api from "../config/api";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get<{ data: Product[] }>("/products", {});
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const { data } = await api.get<{ data: string[] }>("/products/categories", {});
    console.log("💀 ~ getCategories ~ data:", data)
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch categories");
  }
};

export const searchProducts = async (name: string): Promise<Product[]> => {
  try {
    const { data } = await api.get<{ data: Product[] }>(
      `/products/search?q=${encodeURIComponent(name)}`
    );
    return data.data;
  } catch (err) {
    throw new Error("Failed to search products");
  }
};
