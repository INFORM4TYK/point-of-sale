import axios from "axios";
import { Product } from "../types/Product";
import { Category } from "../types/Category";
import { HttpError } from "../utils/httpError";

const BASE_URL = "https://fakestoreapi.com";

export const getAllProductsService = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<Product[]>(`${BASE_URL}/products`);
    return data;
  } catch (err) {
    throw new HttpError(500, "products/failed-fetch-categories");
  }
};

export const getCategoriesService = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get<Category[]>(
      `${BASE_URL}/products/categories`
    );
    return data;
  } catch (err) {
    throw new HttpError(500, "products/failed-fetch-products");
  }
};

export const searchProductsService = async (
  query: string
): Promise<Product[]> => {
  const allProductsRes = await axios.get<Product[]>(`${BASE_URL}/products`);
  const allProducts = allProductsRes.data;

  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return filtered;
};
