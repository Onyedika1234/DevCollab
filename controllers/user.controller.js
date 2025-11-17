import prisma from "../utils/prisma.js";
import redisClient from "../utils/redis.js";
export const userProfile = async (req, res) => {
  try {
    const { id } = req.user;
    let profile;

    const redisUser = await redisClient.get(`profile/${id}`);

    if (redisUser) {
      profile = JSON.parse(redisUser);
    } else {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          name: true,
          username: true,
          email: true,
          bio: true,
          followers: true,
          following: true,
        },
      });

      await redisClient.setEx(`profile/${id}`, 3600, JSON.stringify(user));

      profile = user;
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { bio } = req.body;

    const profile = await prisma.user.findUnique({
      where: { id },
      select: { bio: true },
    });
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "User Profile not found." });

    const updated = await prisma.user.update({
      where: { id },
      data: { bio },
      select: {
        name: true,
        username: true,
        email: true,
        bio: true,
        followers: true,
        following: true,
      },
    });
    await redisClient.del(`profile/${id}`);
    res.status(201).json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.user; // User id

    const { targetId } = req.targetId; //Id of user you desire to follow

    if (id === targetId)
      return res
        .status(400)
        .json({ success: false, message: "You can't follow yourself" });

    const follow = await prisma.follower.create({
      data: {
        followerId: id,
      },
    });

    await redisClient.del(`profile/${id}`);
    await redisClient.del(`profile/${followingId}`);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error following user: ${error.message}`,
    });
  }
};
