import { Router } from "express";
import {
  addCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
  searchCustomersController,
} from "../controller/customerController";
import { customerSchema } from "../validators/validate";
import { validateBody } from "../middleware/validate";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", validateBody(customerSchema),authMiddleware,  addCustomerController);
router.get("/", authMiddleware, getAllCustomersController);
router.get("/search", authMiddleware, searchCustomersController);
router.get("/:id", authMiddleware, getCustomerByIdController);
router.put("/:id", authMiddleware, updateCustomerController);
router.delete("/:id",authMiddleware,  deleteCustomerController);

export default router;
