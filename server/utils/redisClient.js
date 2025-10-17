let redisClient = null;

try {
  if (process.env.REDIS_URL) {
    const redis = require("redis");
    redisClient = redis.createClient({ url: process.env.REDIS_URL });
    redisClient.connect();
    console.log("✅ Connected to Redis");
  } else {
    console.log("⚠️ No Redis configured. Running without cache.");
  }
} catch (err) {
  console.error("❌ Redis connection failed:", err.message);
}

module.exports = redisClient;
