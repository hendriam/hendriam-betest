const jsowebtoken = require("jsonwebtoken");
const SendResponse = require("../helpers/response");

exports.Authentication = async (req, res) => {
    return new Promise(async function (resolve, reject) {
        if (!req.headers["token"]) {
            return SendResponse(
                res,
                "Token is not valid.",
                null,
                401,
                "[VALIDATION][JWT] Token is not valid"
            );
        }

        try {
            jsowebtoken.verify(
                req.headers["token"],
                process.env.SECRET_KEY,
                (err, decode) => {
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            return SendResponse(
                                res,
                                "Token Expired.",
                                null,
                                401,
                                "[VALIDATION][JWT] Token Expired"
                            );
                        }

                        return SendResponse(
                            res,
                            "Unauthorized.",
                            null,
                            401,
                            "[VALIDATION][JWT] Unauthorized"
                        );
                    }

                    if (decode.userName != req.headers["username"]) {
                        return SendResponse(
                            res,
                            "Username is not valid.",
                            null,
                            401,
                            "[VALIDATION][JWT][USERNAME] Username is not valid"
                        );
                    }
                    resolve(decode);
                }
            );
        } catch (err) {
            return SendResponse(
                res,
                "Internal server error.",
                null,
                500,
                `[VALIDATION][JWT] ${err.message}`
            );
        }
    });
};
