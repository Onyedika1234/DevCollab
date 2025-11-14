import prisma from "../utils/prisma.js";
import redisClient from "../utils/redis.js";
export const userProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    let profile;

    const redisUser = await redisClient.get(`profile/${userId}`);

    if (redisUser) {
      profile = JSON.parse(redisUser);
    } else {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          username: true,
          email: true,
          bio: true,
          followers: true,
          following: true,
        },
      });

      await redisClient.setEx(`profile/${userId}`, 3600, JSON.stringify(user));

      profile = user;
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio } = req.body;

    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: { bio: true },
    });
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "User Profile not found." });

    const updated = await prisma.user.update({
      where: { id: userId },
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
    await redisClient.del(`profile/${userId}`);
    res.status(201).json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
