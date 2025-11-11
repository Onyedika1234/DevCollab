import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { globalRateLimiter } from "./utils/ratelimit.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(globalRateLimiter);

app.get("/", (_, res) => res.send("Api is running..."));

app.listen(process.env.PORT, () => console.log("Server running..."));
