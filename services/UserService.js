const User = require("../domains/users.js");

exports.UserService = class UserService {
  constructor(userRepository, userCacheRepository) {
    this.userRepository = userRepository;
    this.userCacheRepository = userCacheRepository;
  }

  createUser(userData) {
    const user = new User(this.userRepository, {
      id: userData.id,
      userName: userData.userName,
      accountNumber: userData.accountNumber,
      emailAddress: userData.emailAddress,
      identityNumber: userData.identityNumber,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    });

    user.save();

    const userCache = new User(this.userCacheRepository, {
      id: userData.id,
      userName: userData.userName,
      accountNumber: userData.accountNumber,
      emailAddress: userData.emailAddress,
      identityNumber: userData.identityNumber,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    });

    userCache.save();

    return userData;
  }

  async getUserByAccountNumber(accountNumber) {
    const user = await this.getUserByAccountNumberCache(accountNumber);
    if (user != null) {
      return user;
    }

    return await this.getUserByAccountNumberMain(accountNumber);
  }

  async getUserByAccountNumberCache(accountNumber) {
    try {
      const user = new User(this.userCacheRepository, {
        accountNumber: accountNumber,
      });

      await user.getUserByAccountNumber();

      return user;
    } catch (err) {
      return null;
    }
  }

  async getUserByAccountNumberMain(accountNumber) {
    try {
      const user = new User(this.userRepository, {
        accountNumber: accountNumber,
      });

      await user.getUserByAccountNumber();

      return user;
    } catch (err) {
      return null;
    }
  }

  async getUserByIdentityNumber(identityNumber) {
    const user = await this.getUserByIdentityNumberCache(identityNumber);
    if (user != null) {
      return user;
    }

    return await this.getUserByIdentityNumberMain(identityNumber);
  }

  async getUserByIdentityNumberCache(identityNumber) {
    try {
      const user = new User(this.userCacheRepository, {
        identityNumber: identityNumber,
      });

      await user.getUserByIdentityNumber();

      return user;
    } catch (err) {
      return null;
    }
  }

  async getUserByIdentityNumberMain(identityNumber) {
    try {
      const user = new User(this.userRepository, {
        identityNumber: identityNumber,
      });

      await user.getUserByIdentityNumber();

      return user;
    } catch (err) {
      return null;
    }
  }

  async updateUser(userId, newUser) {
    const userData = {
      id: userId,
      userName: newUser.userName,
      accountNumber: newUser.accountNumber,
      emailAddress: newUser.emailAddress,
      identityNumber: newUser.identityNumber,
      updated_at: newUser.updated_at,
    };

    const userCache = new User(this.userCacheRepository, userData);
    await userCache.update();

    const user = new User(this.userRepository, userData);
    await user.update();

    return user;
  }

  async deleteUser(userId) {
    const userCache = new User(this.userCacheRepository, {
      id: userId,
    });

    await userCache.delete();

    const user = new User(this.userRepository, {
      id: userId,
    });

    await user.delete();

    return user;
  }
};
