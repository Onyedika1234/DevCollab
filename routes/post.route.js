import { Router } from "express";
import { validatePost } from "../middleware/validate.middleware.js";

const postRouter = Router();

postRouter.post("/", validatePost, (req, res) => {
  const body = { ...req.body };

  res.json(body);
});

export default postRouter;
