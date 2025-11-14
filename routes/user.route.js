import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { updateProfile, userProfile } from "../controllers/user.controller.js";
import { validateBio } from "../middleware/validate.middleware.js";

const userRouter = Router();

userRouter.get("/:userId", authorize, userProfile);

userRouter.patch("/:userId", authorize, validateBio, updateProfile);

export default userRouter;
