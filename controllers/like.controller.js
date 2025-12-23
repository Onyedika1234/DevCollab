import prisma from "../utils/prisma.js";

//Like a post
export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post)
    return res.status(404).json({
      success: false,
      message: "The post you want to react on cannot be found",
    });

  const like = await prisma.like.create({
    data: { userId, postId, idempotencyId: "001" },
  });

  await redisClient.del(`post/${postId}`);

  res.status(200).json({ success: true, message: "Liked." });
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const { likeId } = req.params;
    if (!likeId)
      return res
        .status(400)
        .json({ success: false, message: "LikeId and must be provided." });

    // const postExist = await prisma.post.findUnique({ where: { id: postId } });
    // if (!postExist)
    //   return res.status(404).json({ success: false, message: "Post not found" });

    const likeExist = await prisma.like.findUnique({ where: { id: likeId } });

    if (!likeExist)
      return res
        .status(404)
        .json({ success: false, message: "Like action not found" });

    await prisma.like.delete({ where: { id: likeId } });

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to unlike due to: ${error.messagae}`,
    });
  }
};
