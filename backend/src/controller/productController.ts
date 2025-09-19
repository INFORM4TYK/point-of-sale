import {
  getAllProductsService,
  getCategoriesService,
  getProductByIdService,
  searchProductsService,
} from "../services/productService";
import { Response, Request, NextFunction } from "express";
export const fetchAllProductsController = async (
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

export const fetchCategoriesController = async (
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

export const searchProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = (req.query.q as string).slice(0, 100);
    if (!query) return res.status(400).json({ message: "Query is required" });

    const products = await searchProductsService(query);
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });

    const products = await getProductByIdService(id);
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};
