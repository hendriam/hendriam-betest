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

  async getByAccountNumber({ accountNumber }) {
    try {
      const key = userByAccountNumberPrefix + accountNumber;

      console.log(key);

      const data = await this.UserCache.get(key);

      console.log(data);

      return JSON.parse(data);
    } catch (err) {
      console.log("repo-cache", err.stack);
      throw new Error(`errUserNotFound`);
    }
  }

  async getByIdentityNumber({ identityNumber }) {
    console.log(identityNumber);

    try {
      const key = userByIdentityNumberPrefix + identityNumber;
      console.log(key);
      const data = await this.UserCache.get(key);

      console.log(data);

      return JSON.parse(data);
    } catch (err) {
      throw new Error(`errUserNotFound`);
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
