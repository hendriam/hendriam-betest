const UserModel = require("../models/UserModel.js");
const moment = require("moment");
const SendResponse = require("../helpers/response");
const jsowebtoken = require("jsonwebtoken");

exports.GenerateToken = async (req, res) => {
    let dataUser = {
        userName: req.body.userName,
        emailAddress: req.body.emailAddress,
    };

    let checkedUser = await checkUser(dataUser);
    if (checkedUser === "ERROR") {
        return SendResponse(
            res,
            "Internal Server Error",
            null,
            500,
            "[GENERATE-TOKEN][ERROR]"
        );
    } else if (checkedUser === null) {
        return SendResponse(
            res,
            "username or password not match",
            null,
            404,
            "[GENERATE-TOKEN][NOT-ERROR]"
        );
    }

    let token = await createToken(checkedUser);

    if (token == "ERROR") {
        return SendResponse(
            res,
            "Token Error",
            null,
            500,
            "[GENERATE-TOKEN][NOT-ERROR]"
        );
    }

    let data = {
        token: token,
    };

    return SendResponse(res, "Ok", data, 200, "[GENERATE-TOKEN][SUCCESSFULLY]");
};

function checkUser(dataUser) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({
            userName: dataUser.userName,
            emailAddress: dataUser.emailAddress,
        })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                resolve("ERROR");
            });
    });
}

async function createToken(dataUser) {
    let optionsJwt = {
        algorithm: "HS256",
        expiresIn: "1d",
    };

    let userGenerateToken = {
        accountNumber: dataUser.accountNumber,
        userName: dataUser.userName,
    };

    try {
        var token = jsowebtoken.sign(
            userGenerateToken,
            "TOPSECRETHENDRIAM",
            optionsJwt
        );
    } catch (err) {
        return "ERROR";
    } finally {
        return token;
    }
}
