import prisma from "../utils/prisma.js";
import redisClient from "../utils/redis.js";
import { followdto } from "../utils/dtos.js";
export const userProfile = async (req, res) => {
  try {
    const { id } = req.user;
    let profile;

    const redisUser = await redisClient.get(`profile/${id}`);

    if (redisUser) {
      console.log("Cache hit");
      profile = JSON.parse(redisUser);
    } else {
      // const user = await prisma.user.findUnique({
      //   where: { id },
      //   select: { password: false },
      //   include: {
      //     followers: {
      //       include: { follower: true },
      //     },
      //     following: {
      //       include: {
      //         follower: {
      //           select: {
      //             password: false,
      //             createdAt: false,
      //             updatedAt: false,
      //             id: false,
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          bio: true,
          createdAt: true,
          updatedAt: true,

          followers: {
            include: {
              follower: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
          },

          following: {
            include: {
              following: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
          },
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

    const targetId = req.targetId; //Id of user you desire to follower
    const idempotencyId = followdto(req.body).idempotencyId;
    if (!idempotencyId)
      return res
        .status(400)
        .json({ success: false, message: "Idempotency Id not found" });

    if (id === targetId)
      return res
        .status(400)
        .json({ success: false, message: "You can't follow yourself" });

    const targetUser = await prisma.user.findUnique({
      where: { id: targetId },
      select: { id: true, followers: true },
    });

    if (!targetUser)
      return res.status(404).json({
        success: false,
        message: "User to be followed cannot be found.",
      });

    const alreadyFollowing = await prisma.follower.findFirst({
      where: {
        followerId: id,
        followingId: targetId,
      },
      select: { id: true },
    });

    if (alreadyFollowing)
      return res.status(400).json({
        success: false,
        message: "You are already following the user",
      });

    const follow = await prisma.follower.create({
      data: {
        followerId: id,
        followingId: targetId,
        idempotencyId,
      },
    });

    await redisClient.del(`profile/${id}`);
    await redisClient.del(`profile/${targetId}`);

    res
      .status(200)
      .json({ success: true, message: "User followed Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error following user: ${error.message}`,
    });
  }
};

export const unfollow = async (req, res) => {
  const { id } = req.id;
  const targetId = req.targetId;

  try {
    const checkFollowerStatus = await prisma.follower.findUnique({
      where: { followerId: id, followingId: targetId },
      select: { id: true },
    });

    if (!checkFollowerStatus)
      return res
        .status(404)
        .json({ success: false, mesage: "You never followed this account." });

    const unfollow = await prisma.follower.delete({
      where: { id: checkFollowerStatus.id },
    });

    await redisClient.del(`profile/${id}`);
    await redisClient.del(`profile/${targetId}`);

    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in following user" });
  }
};
