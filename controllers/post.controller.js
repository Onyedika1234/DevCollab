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
      data: { ...postData },
    });

    res.status(201).json({ success: true, createPost });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error creating post: ${error}` });
  }
};

export const getPosts = async (req, res) => {
  let posts;

  const post = await redisClient.get("post");
  if (post) {
    const postFromRedis = JSON.parse(post);
    // posts = postFromRedis.splice()
  } else {
    posts = await prisma.post.findMany({
      take: 100,
    });

    await redisClient.setEx("post", 3600, JSON.stringify(posts));
  }
};
