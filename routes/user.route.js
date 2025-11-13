import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { userProfile } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/:userId", authorize, userProfile);

export default userRouter;
