import { Router } from "express";
import { validateSignUp } from "../middleware/validate.middleware.js";
import { authRateLimiter } from "../utils/ratelimit.js";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", authRateLimiter, validateSignUp, signUp);

export default authRouter;
