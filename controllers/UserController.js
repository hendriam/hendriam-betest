const UserModel = require("../models/UserModel.js");
const UserCache = require("../models/UserCache.js");

const SendResponse = require("../helpers/response");
const tokenValidator = require("../utilities/ValidationJwt.js");
const { UserService } = require("../services/UserService.js");

const { UserDbRepository } = require("../repositories/userDb.js");
const { UserCacheRepository } = require("../repositories/userCache.js");

const userRepository = new UserDbRepository(UserModel);
const userCacheRepository = new UserCacheRepository(UserCache);

const userService = new UserService(userRepository, userCacheRepository);

exports.Create = async function (req, res) {
  await tokenValidator.Authentication(req, res);

  let bodyCreate = {
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    emailAddress: req.body.emailAddress,
    identityNumber: req.body.identityNumber,
  };

  try {
    const savedUser = await userService.createUser(bodyCreate);

    return SendResponse(
      res,
      "Ok",
      savedUser.value(),
      201,
      "[CREATE-USER][SUCCESSFULLY]",
    );
  } catch (err) {
    console.log(err.stack);

    return SendResponse(
      res,
      err._message,
      err.errors,
      422,
      "[CREATE-USER][FAILED]",
    );
  }
};

exports.Update = async function (req, res) {
  await tokenValidator.Authentication(req, res);

  let bodyUpdate = {
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    emailAddress: req.body.emailAddress,
    identityNumber: req.body.identityNumber,
  };

  try {
    const updatedUser = await userService.updateUser(req.params.id, bodyUpdate);

    return SendResponse(
      res,
      "Ok",
      updatedUser.value(),
      200,
      "[UPDATE-USER][SUCCESSFULLY]",
    );
  } catch (err) {
    console.log(err.stack);

    // check if id is exist
    if (err.message === "errUserNotFound") {
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
};

exports.ReadByAccountNumber = async function (req, res) {
  await tokenValidator.Authentication(req, res);

  try {
    const userByAccountNumber = await userService.getUserByAccountNumber(
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
    console.log(err.stack);

    if (err.message === "errUserNotFound") {
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
};

exports.ReadByIdentityNumber = async function (req, res) {
  await tokenValidator.Authentication(req, res);

  try {
    const userByIdentityNumber = await userService.getUserByIdentityNumber(
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
    console.log(err.stack);
    if (err.message === "errUserNotFound") {
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
};

exports.Delete = async function (req, res) {
  await tokenValidator.Authentication(req, res);

  try {
    const deletedUser = await userService.deleteUser(req.params.id);

    return SendResponse(
      res,
      "Ok",
      deletedUser.value(),
      200,
      "[DELETE-USER][SUCCESSFULLY]",
    );
  } catch (err) {
    if (err.message === "errUserNotFound") {
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
};
