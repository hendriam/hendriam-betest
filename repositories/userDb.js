exports.UserDbRepository = class UserDbRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async save(user) {
    const userDb = new this.UserModel(user);

    return await userDb.save();
  }

  async getByAccountNumber({ accountNumber }) {
    const user = await UserModel.findOne({
      accountNumber: accountNumber,
    });

    if (user == null) {
      throw new Error("User not found");
    }

    return user;
  }

  async getByIdentityNumber({ identityNumber }) {
    const user = await UserModel.findOne({
      identityNumber: identityNumber,
    });

    if (user == null) {
      throw new Error("User not found");
    }

    return user;
  }

  async update({ id, ...user }) {
    const user = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (user == null) {
      throw new Error("User not found");
    }

    return user;
  }

  async delete(user) {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (user == null) {
      throw new Error("User not found");
    }

    return user;
  }
};
