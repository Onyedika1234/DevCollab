import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  followUser,
  updateProfile,
  userProfile,
} from "../controllers/user.controller.js";
import {
  validateBio,
  validateFollow,
} from "../middleware/validate.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, userProfile);

userRouter.patch("/", authorize, validateBio, updateProfile);

userRouter.post("/follow", authorize, validateFollow, followUser);

export default userRouter;
