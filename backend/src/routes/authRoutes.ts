import { Router } from "express";
import { register, login, getCurrentUser } from "../controller/authController";
import { validateBody } from "../middleware/validate";
import { userSchema } from "../validators/validate";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/register", validateBody(userSchema), register);
router.post("/login", validateBody(userSchema), login);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
