exports.User = class User {
  constructor(UserRepository, user) {
    this.UserRepository = UserRepository;
    this.user = Object.freeze({
      id: user.id,
      userName: user.userName,
      accountNumber: user.accountNumber,
      emailAddress: user.emailAddress,
      identityNumber: user.identityNumber,
    });
  }

  async save() {
    await this.UserRepository.save(this.user);
  }

  async getByAccountNumber() {
    const user = await this.UserRepository.getByAccountNumber(
      this.user.accountNumber,
    );

    this.user = Object.freeze(user);
  }

  async getByIdentityNumber() {
    const user = await this.UserRepository.getByIdentityNumber(
      this.user.identityNumber,
    );

    this.user = Object.freeze(user);
  }

  update() {
    this.UserRepository.update(this.user);
  }

  delete() {
    this.UserRepository.delete(this.user);
  }

  value() {
    return this.user;
  }
};
