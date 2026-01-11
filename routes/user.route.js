import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  followUser,
  updateProfile,
  userProfile,
  unfollow,
  getUserProfileById,
} from "../controllers/user.controller.js";
import {
  validateBio,
  validateFollow,
} from "../middleware/validate.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, userProfile);

userRouter.get("/:targetId", authorize, getUserProfileById);

userRouter.patch("/", authorize, validateBio, updateProfile);

userRouter.post("/follow", authorize, validateFollow, followUser);

userRouter.delete("/unfollow", authorize, validateFollow, unfollow);

export default userRouter;
