const UserModel = require("../models/UserModel.js");
const moment = require("moment");
const SendResponse = require("../helpers/response");
const logger = require("../libs/logging.js");

exports.Create = async (req, res) => {
    let bodyCreate = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
        const NewUser = new UserModel(bodyCreate);
        const savedUser = await NewUser.save();

        return SendResponse(
            res,
            "Ok",
            savedUser,
            201,
            "[CREATE-USER][SUCCESSFULLY]"
        );
    } catch (err) {
        return SendResponse(
            res,
            err._message,
            err.errors,
            422,
            "[CREATE-USER][FAILED]"
        );
    }
};

exports.Update = async (req, res) => {
    let bodyUpdate = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            bodyUpdate,
            {
                new: true,
            }
        );

        // check if id is exist
        if (updatedUser == null) {
            return SendResponse(
                res,
                "_id is not exist",
                updatedUser,
                404,
                "[UPDATE-USER][FAILED]"
            );
        }

        return SendResponse(
            res,
            "Ok",
            updatedUser,
            200,
            "[UPDATE-USER][SUCCESSFULLY]"
        );
    } catch (err) {
        return SendResponse(
            res,
            "Internal Server Error",
            null,
            500,
            "[UPDATE-USER][FAILED]"
        );
    }
};

exports.ReadByAccountNumber = async (req, res) => {
    try {
        const userByAccountNumber = await UserModel.findOne({
            accountNumber: req.params.accountNumber,
        });

        // check if id is exist
        if (userByAccountNumber == null) {
            return SendResponse(
                res,
                "_id is not exist",
                null,
                404,
                "[GET-USER][FAILED]"
            );
        }

        return SendResponse(
            res,
            "Ok",
            userByAccountNumber,
            200,
            "[GET-USER][FOUND]"
        );
    } catch (err) {
        return SendResponse(
            res,
            "Internal Server Error",
            null,
            500,
            "[GET-USER][ERROR]"
        );
    }
};

exports.ReadByIdentityNumber = async (req, res) => {
    try {
        const userByIdentityNumber = await UserModel.findOne({
            identityNumber: req.params.identityNumber,
        });

        // check if id is exist
        if (userByIdentityNumber === null) {
            return SendResponse(
                res,
                "_id is not exist",
                null,
                404,
                "[GET-USER][NOT FOUND]"
            );
        }

        return SendResponse(
            res,
            "Ok",
            userByIdentityNumber,
            200,
            "[GET-USER][FOUND]"
        );
    } catch (err) {
        return SendResponse(
            res,
            "Internal Server Error",
            null,
            500,
            "[GET-USER][ERROR]"
        );
    }
};

exports.Delete = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

        // check if id is exist
        if (deletedUser === null) {
            return SendResponse(
                res,
                "_id is not exist",
                null,
                404,
                "[DELETE-USER][NOT FOUND]"
            );
        }

        return SendResponse(
            res,
            "Ok",
            deletedUser._message,
            200,
            "[DELETE-USER][SUCCESSFULLY]"
        );
    } catch (err) {
        return SendResponse(
            res,
            "Internal Server Error",
            null,
            500,
            "[DELETE-USER][ERROR]"
        );
    }
};
