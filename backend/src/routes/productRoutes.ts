import { Router } from "express";
import { searchProductsService } from "../services/productService";
import {
  fetchAllProducts,
  fetchCategories,
  searchProducts,
} from "../controller/productController";
const router = Router();

router.get("/", fetchAllProducts);
router.get("/categories", fetchCategories);
router.get("/search", searchProducts);
export default router;
