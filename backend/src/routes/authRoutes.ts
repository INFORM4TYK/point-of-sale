import { Router } from "express";
import { register, login } from "../controller/authController";
import { validateBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/validate";
const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

export default router;
