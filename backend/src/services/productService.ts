import axios from "axios";
import { Product } from "../types/Product";
import { HttpError } from "../utils/httpError";
import {
  createCategory,
  createProduct,
  searchProducts,
} from "../models/productModel";
import pool from "../config/db";

const BASE_URL = "https://fakestoreapi.com";

export const getAllProductsService = async (): Promise<Product[]> => {
  try {
    const result = await pool.query("SELECT * FROM products");
    if (result.rows.length > 0) {
      return result.rows as Product[];
    }

    const { data } = await axios.get<Product[]>(`${BASE_URL}/products`);

    await createProduct(data);

    return data;
  } catch (err) {
    throw new HttpError(500, "products/failed-fetch-products");
  }
};

export const getCategoriesService = async (): Promise<string[]> => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    if (result.rows.length > 0) {
     return result.rows.map(row => row.category);
    }

    const { data } = await axios.get<string[]>(
      `${BASE_URL}/products/categories`
    );
    await createCategory(data);
    return data;
  } catch (err) {
    throw new HttpError(500, "products/failed-fetch-categories");
  }
};

export const searchProductsService = async (
  query: string
): Promise<Product[]> => {
  try {
    return await searchProducts(query);
  } catch (err) {
    throw new HttpError(500, "products/failed-search-products");
  }
};
