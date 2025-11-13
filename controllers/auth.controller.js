import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.credentials;

    //Check if email || username exist in the system

    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmailUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already Exist.." });

    const existingUsernameUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsernameUser)
      return res
        .status(400)
        .json({ success: false, message: "Username already exist..." });

    const salt = await bcrypt.genSalt(10); //This salts the password

    const hashedPassword = await bcrypt.hash(password, salt); //Hashes the password for security

    const user = await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
    }); //Creation of a new user in the db.

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }); //Assigning a token to a user.

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 604800 * 60 * 1000,
    });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.credentials;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, password: true },
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found. Signup to continue.",
      });

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 604800 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to log out" });
  }
};
