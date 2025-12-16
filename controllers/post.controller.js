import redisClient from "../utils/redis.js";
import prisma from "../utils/prisma.js";

export const createPost = async (req, res) => {
  try {
    const postData = { ...req.body };

    if (!postData)
      res.status(404).json({
        success: false,
        message: "Couldn't get the post data from the user",
      });

    const createPost = await prisma.post.create({
      data: { ...postData, authorId: req.user.id },
    });

    await redisClient.del("posts");

    res.status(201).json({
      success: true,
      message: "Post created Successfully",
      post: createPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error creating post: ${error}` });
  }
};

export const getPosts = async (_, res) => {
  try {
    let posts;

    const cachedPosts = await redisClient.get("posts");
    if (cachedPosts) {
      console.log("Cached Hit");
      posts = JSON.parse(cachedPosts);
    } else {
      console.log("Cache Missed");
      posts = await prisma.post.findMany({
        include: { author: true, likes: true, comments: true },
        take: 100,
      });
      await redisClient.setEx("posts", 3600, JSON.stringify(posts));
    }

    if (posts.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No post found!!!" });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      success: false,
      messagae: `Error getting posts: ${error.message}`,
    });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post)
    return res.status(404).json({
      success: false,
      message: "The post you want to react on cannot be found",
    });
};

export const unlikePost = async (req, res) => {};
