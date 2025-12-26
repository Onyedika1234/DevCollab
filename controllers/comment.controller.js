import prisma from "../utils/prisma.js";

export const createComment = async (req, res) => {
  try {
    const { content, idempotencyId, postId } = req.comment;
    const userId = req.user.id;

    const postExist = await prisma.post.findUnique({ where: { id: postId } });
    if (!postExist)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const newComment = await prisma.comment.create({
      data: { content, postId, authorId: userId, idempotencyId },
    });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to comment due to: ${error.message}`,
    });
  }
};

//Get all comments of a post
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
    if (!comments)
      return res
        .status(404)
        .json({ success: false, message: "No comment found" });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Couldn't get comments due to: ${error.message}`,
    });
  }
};
