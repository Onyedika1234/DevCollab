import redisClient from "../utils/redis.js";
import prisma from "../utils/prisma.js";

//Creating post
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

//Get all post plus the filtering logic
export const getPosts = async (req, res) => {
  let { filter } = req.query;

  filter = filter ? filter : "";
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

    const filteredPost = posts.filter((post) => {
      return post.language.toLowerCase().includes(filter);
    });

    //Filtering logic.
    if (!filteredPost)
      return res.status(404).json({
        success: false,
        message: "Posts suiting the filter option cannot be found.",
      });

    res.status(200).json({ posts: filteredPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      messagae: `Error getting posts: ${error.message}`,
    });
  }
};

//Getting a single post
export const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    let post;

    const cachedPost = await redisClient.get(`posts/${postId}`);

    if (cachedPost) {
      post = JSON.parse(cachedPost);
      return res.status(200).json({
        success: true,
        post: { ...post, totalLikes: post.likes.length },
      });
    } else {
      post = await prisma.post.findUnique({
        where: { id: postId },
        include: { likes: true, comments: true },
      });
      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });

      // Redis expects strings or buffers; serialize the post before storing.
      await redisClient.setEx(`posts/${postId}`, 1800, JSON.stringify(post));

      return res.status(200).json({
        success: true,
        post: { ...post, totalLikes: post.likes.length },
      });
    }

    // res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
