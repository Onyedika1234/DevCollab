import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { globalRateLimiter } from "./utils/ratelimit.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(globalRateLimiter);

app.use("/auth", authRouter);

app.get("/", (_, res) => res.send("Api is running..."));

app.listen(process.env.PORT, () => console.log("Server running..."));
