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
