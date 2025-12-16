import { Router } from "express";
import { validatePost } from "../middleware/validate.middleware.js";
import {
  createPost,
  getPosts,
  likePost,
} from "../controllers/post.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const postRouter = Router();

postRouter.post("/", authorize, validatePost, createPost);

postRouter.get("/", authorize, getPosts);

postRouter.patch("/:postId/like", authorize, likePost);

postRouter.patch("/:postId/unlike", authorize);

export default postRouter;
