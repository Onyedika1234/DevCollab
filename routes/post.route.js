import { Router } from "express";
import {
  validatePost,
  validateComment,
} from "../middleware/validate.middleware.js";
import {
  createPost,
  getPost,
  getPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import { likePost, unlikePost } from "../controllers/like.controller.js";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const postRouter = Router();

//Create a new post
postRouter.post("/", authorize, validatePost, createPost);

//Get all posts
postRouter.get("/", authorize, getPosts);

//Get a single post by Id
postRouter.get("/:postId", authorize, getPost);

//Get posts of a specific user

postRouter.get("/:userId", authorize, getUserPosts);

//Like a post
postRouter.patch("/:postId/like", authorize, likePost);

//Unlike a post
postRouter.patch("/:postId/unlike", authorize, unlikePost);

//Comment on a post
postRouter.post("/:postId/comment", authorize, validateComment, createComment);

//Get all comments in a post
postRouter.get("/:postId/comments", authorize, getComments);

export default postRouter;
