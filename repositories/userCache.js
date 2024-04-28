const userByAccountNumberPrefix = "USER_BY_ACCOUNT_NUMBER_";
const userByIdentityNumberPrefix = "USER_BY_IDENTITY_NUMBER_";

const expirationInSecond = 60 * 60 * 8;

exports.UserCacheRepository = class UserCacheRepository {
  constructor(UserCache) {
    this.UserCache = UserCache;
  }

  async save(user) {
    try {
      await this.saveUserByAccountNumber(user);
      await this.saveUserByIdentityNumber(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveUserByAccountNumber(user) {
    const key = userByAccountNumberPrefix + user.accountNumber;
    const data = JSON.stringify(user);

    await this.UserCache.set(key, data, {
      EX: expirationInSecond,
    });
  }

  async saveUserByIdentityNumber(user) {
    const key = userByIdentityNumberPrefix + user.identityNumber;
    const data = JSON.stringify(user);

    await this.UserCache.set(key, data, {
      EX: expirationInSecond,
    });
  }

  async getByAccountNumber(user) {
    try {
      const key = userByAccountNumberPrefix + user.accountNumber;
      const data = await this.UserCache.get(key);

      return JSON.parse(data);
    } catch (err) {
      throw new Error("User not found");
    }
  }

  async getByIdentityNumber(user) {
    try {
      const key = userByIdentityNumberPrefix + user.identityNumber;
      const data = await this.UserCache.get(key);

      return JSON.parse(data);
    } catch (err) {
      throw new Error("User not found");
    }
  }

  update(user) {
    return this.save(user);
  }

  async delete(user) {
    await deleteByAccountNumber(user);
    await deleteByIdentityNumber(user);
  }

  async deleteByAccountNumber(user) {
    const key = userByAccountNumberPrefix + user.accountNumber;

    await this.UserCache.del(key);
  }

  async deleteByIdentityNumber(user) {
    const key = userByIdentityNumberPrefix + user.identityNumber;

    await this.UserCache.del(key);
  }
};
