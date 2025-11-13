import { Router } from "express";
import {
  validateLogin,
  validateSignUp,
} from "../middleware/validate.middleware.js";
import { authRateLimiter } from "../utils/ratelimit.js";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

//Signup route
authRouter.post("/signup", authRateLimiter, validateSignUp, signUp);

//Login route
authRouter.post("/login", authRateLimiter, validateLogin, login);

authRouter.post("/logout", authRateLimiter, logout);

export default authRouter;
