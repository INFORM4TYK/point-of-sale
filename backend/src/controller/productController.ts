import {
  getAllProductsService,
  getCategoriesService,
  searchProductsService,
} from "../services/productService";
import { Response, Request, NextFunction } from "express";
export const fetchAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};

export const fetchCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({ data: categories });
  } catch (err) {
    next(err);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const products = await searchProductsService(query);
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};
