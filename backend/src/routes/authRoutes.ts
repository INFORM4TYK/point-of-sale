import { Router } from "express";
import { register, login } from "../controller/authController";
import { validateBody } from "../middleware/validate";
import { userSchema } from "../validators/validate";
const router = Router();

router.post("/register", validateBody(userSchema), register);
router.post("/login", validateBody(userSchema), login);

export default router;
