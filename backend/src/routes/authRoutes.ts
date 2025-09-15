import { Router } from "express";
import {
  registerController,
  loginController,
  getCurrentUserController,
} from "../controller/authController";
import { validateBody } from "../middleware/validate";
import { userSchema } from "../validators/validate";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/register", validateBody(userSchema), registerController);
router.post("/login", validateBody(userSchema), loginController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;
