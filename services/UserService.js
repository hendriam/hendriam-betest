const { User } = require("../domains/users.js");

exports.UserService = class UserService {
  constructor(userRepository, userCacheRepository) {
    this.userRepository = userRepository;
    this.userCacheRepository = userCacheRepository;
  }

  createUser(newUser) {
    const userData = {
      id: newUser.id,
      userName: newUser.userName,
      accountNumber: newUser.accountNumber,
      emailAddress: newUser.emailAddress,
      identityNumber: newUser.identityNumber,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = new User(this.userRepository, userData);
    user.save();

    const userCache = new User(this.userCacheRepository, userData);
    userCache.save();

    return user;
  }

  async getUserByAccountNumber(accountNumber) {
    const userCache = await this.getUserByAccountNumberCache(accountNumber);
    if (userCache != null) {
      return userCache;
    }

    const user = await this.getUserByAccountNumberMain(accountNumber);
    if (user == null) {
      throw new Error(`errUserNotFound`);
    }

    return user;
  }

  async getUserByAccountNumberCache(accountNumber) {
    try {
      const user = new User(this.userCacheRepository, {
        accountNumber: accountNumber,
      });

      await user.getByAccountNumber();

      return user;
    } catch (err) {
      console.log("[service] getUserByAccountNumberCache err", err);
      return null;
    }
  }

  async getUserByAccountNumberMain(accountNumber) {
    try {
      const user = new User(this.userRepository, {
        accountNumber: accountNumber,
      });

      await user.getByAccountNumber();

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

      await user.getByIdentityNumber();

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

      await user.getByIdentityNumber();

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
      updated_at: new Date(),
    };
    const user = new User(this.userRepository, userData);
    await user.update();

    console.log("[service] updateUser", user.value());

    const userCache = new User(this.userCacheRepository, user.value());
    await userCache.update();

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
