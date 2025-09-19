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

const router = Router();

router.post("/", validateBody(customerSchema), addCustomerController);
router.get("/", getAllCustomersController);
router.get("/search", searchCustomersController);
router.get("/:id", getCustomerByIdController);
router.put("/:id", updateCustomerController);
router.delete("/:id", deleteCustomerController);

export default router;
