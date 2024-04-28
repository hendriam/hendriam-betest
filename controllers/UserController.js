const UserModel = require("../models/UserModel.js");
const UserCache = require("../models/UserCache.js");

const moment = require("moment");
const SendResponse = require("../helpers/response");
const tokenValidator = require("../utilities/ValidationJwt.js");
const { UserService } = require("../services/UserService.js");

exports.UserController = class UserController {
  constructor() {
    this.userService = new UserService(UserModel, UserCache);
  }

  async Create(req, res) {
    await tokenValidator.Authentication(req, res);

    let bodyCreate = {
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      const savedUser = await this.userService.createUser(bodyCreate);

      return SendResponse(
        res,
        "Ok",
        savedUser.value(),
        201,
        "[CREATE-USER][SUCCESSFULLY]",
      );
    } catch (err) {
      return SendResponse(
        res,
        err._message,
        err.errors,
        422,
        "[CREATE-USER][FAILED]",
      );
    }
  }

  async Update(req, res) {
    await tokenValidator.Authentication(req, res);

    let bodyUpdate = {
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        bodyUpdate,
      );

      return SendResponse(
        res,
        "Ok",
        updatedUser.value(),
        200,
        "[UPDATE-USER][SUCCESSFULLY]",
      );
    } catch (err) {
      // check if id is exist
      if (err.messge === "User not found") {
        return SendResponse(
          res,
          "_id is not exist",
          null,
          404,
          "[UPDATE-USER][FAILED]",
        );
      }

      return SendResponse(
        res,
        "Internal Server Error",
        null,
        500,
        "[UPDATE-USER][FAILED]",
      );
    }
  }

  async ReadByAccountNumber(req, res) {
    await tokenValidator.Authentication(req, res);

    try {
      const userByAccountNumber = this.userService.getUserByAccountNumber(
        req.params.accountNumber,
      );

      return SendResponse(
        res,
        "Ok",
        userByAccountNumber.value(),
        200,
        "[GET-USER][FOUND]",
      );
    } catch (err) {
      if (err.messge === "User not found") {
        return SendResponse(
          res,
          "_id is not exist",
          null,
          404,
          "[UPDATE-USER][FAILED]",
        );
      }

      return SendResponse(
        res,
        "Internal Server Error",
        null,
        500,
        "[GET-USER][ERROR]",
      );
    }
  }

  async ReadByIdentityNumber(req, res) {
    await tokenValidator.Authentication(req, res);

    try {
      const userByIdentityNumber = await this.userService(
        req.params.identityNumber,
      );

      return SendResponse(
        res,
        "Ok",
        userByIdentityNumber.value(),
        200,
        "[GET-USER][FOUND]",
      );
    } catch (err) {
      if (err.messge === "User not found") {
        return SendResponse(
          res,
          "_id is not exist",
          null,
          404,
          "[UPDATE-USER][FAILED]",
        );
      }

      return SendResponse(
        res,
        "Internal Server Error",
        null,
        500,
        "[GET-USER][ERROR]",
      );
    }
  }

  async Delete(req, res) {
    await tokenValidator.Authentication(req, res);

    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);

      return SendResponse(
        res,
        "Ok",
        deletedUser.value(),
        200,
        "[DELETE-USER][SUCCESSFULLY]",
      );
    } catch (err) {
      if (err.messge === "User not found") {
        return SendResponse(
          res,
          "_id is not exist",
          null,
          404,
          "[UPDATE-USER][FAILED]",
        );
      }

      return SendResponse(
        res,
        "Internal Server Error",
        null,
        500,
        "[DELETE-USER][ERROR]",
      );
    }
  }
};
