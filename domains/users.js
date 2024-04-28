exports.User = class User {
  constructor(UserRepository, user) {
    this.UserRepository = UserRepository;
    this.user = Object.freeze({
      id: user.id,
      userName: user.userName,
      accountNumber: user.accountNumber,
      emailAddress: user.emailAddress,
      identityNumber: user.identityNumber,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  }

  async save() {
    const user = await this.UserRepository.save(this.user);

    this.user = Object.freeze(user);
  }

  async getByAccountNumber() {
    const user = await this.UserRepository.getByAccountNumber(this.user);

    this.user = Object.freeze(user);
  }

  async getByIdentityNumber() {
    const user = await this.UserRepository.getByIdentityNumber(this.user);

    this.user = Object.freeze(user);
  }

  async update() {
    const user = await this.UserRepository.update(this.user);

    this.user = Object.freeze(user);
  }

  async delete() {
    const user = await this.UserRepository.delete(this.user);

    this.user = Object.freeze(user);
  }

  value() {
    return this.user;
  }
};
