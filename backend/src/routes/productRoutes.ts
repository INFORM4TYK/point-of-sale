import { Router } from "express";
import { searchProductsService } from "../services/productService";
import {
  fetchAllProductsController,
  fetchCategoriesController,
  searchProductsController,
} from "../controller/productController";

const router = Router();

router.get("/", fetchAllProductsController);
router.get("/categories", fetchCategoriesController);
router.get("/search", searchProductsController);
export default router;
