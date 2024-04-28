const { createClient } = require("redis");

class UserCache {
  constructor() {
    this.client = null;
  }

  async connect() {
    this.client = await createClient({
      url: process.env.REDIS_URL,
    })
      .on("error", (err) => {
        throw new Error(err);
      })
      .connect();
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value) {
    return await this.client.set(key, value);
  }

  async del(key) {
    return await this.client.del(key);
  }
}

module.exports = new UserCache();
