import redis from "redis";

const redisClient = redis.createClient();

redisClient.on("error", (error) => console.error("Redis Client Error", error));

await redisClient.connect();

export default redisClient;
