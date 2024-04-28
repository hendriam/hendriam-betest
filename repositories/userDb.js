exports.UserDbRepository = class UserDbRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async save(user) {
    const userDb = new this.UserModel(user);

    const test = await userDb.save();
    console.log("test", test);

    return test;
  }

  async getByAccountNumber({ accountNumber }) {
    const user = await this.UserModel.findOne({
      accountNumber: accountNumber,
    });

    if (user == null) {
      throw new Error(`errUserNotFound`);
    }

    return user;
  }

  async getByIdentityNumber({ identityNumber }) {
    const user = await this.UserModel.findOne({
      identityNumber: identityNumber,
    });

    if (user == null) {
      throw new Error(`errUserNotFound`);
    }

    return user;
  }

  async update({ id, ...userData }) {
    const user = await this.UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (user == null) {
      throw new Error(`errUserNotFound`);
    }

    return user;
  }

  async delete({ id }) {
    const user = await this.UserModel.findByIdAndDelete(id);

    if (user == null) {
      throw new Error(`errUserNotFound`);
    }

    return user;
  }
};
