import { Router } from "express";
import { searchProductsService } from "../services/productService";
import {
  fetchAllProductsController,
  fetchCategoriesController,
  searchProductsController,
} from "../controller/productController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/",authMiddleware, fetchAllProductsController);
router.get("/categories",authMiddleware,fetchCategoriesController);
router.get("/search",authMiddleware, searchProductsController);
export default router;
