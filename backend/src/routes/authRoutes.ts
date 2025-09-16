import { Router } from "express";
import {
  registerController,
  loginController,
  getCurrentUserController,
  refreshController,
  logoutController,
} from "../controller/authController";
import { validateBody } from "../middleware/validate";
import { userSchema } from "../validators/validate";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/register", validateBody(userSchema), registerController);
router.post("/login", validateBody(userSchema), loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getCurrentUserController);
router.post("/refresh", refreshController);

export default router;
