const { error } = require("winston");
const logger = require("../libs/logging.js");

const sendResponds = (
    res,
    message = null,
    entry = null,
    code = 200,
    logging = "[RESULT]"
) => {
    let dataResponse = null;
    if (code != 200 && code != 201) {
        let errors = entry;
        dataResponse = {
            metadata: {
                code: code,
                message: message,
            },
            errors,
        };
    } else {
        dataResponse = {
            metadata: {
                code: code,
                message: message,
            },
            entry,
        };
    }

    if (code != 200 && code != 201) {
        logger.error(`${logging} => ${JSON.stringify(dataResponse)}`);
    } else {
        logger.info(`${logging} => ${JSON.stringify(dataResponse)}`);
    }

    return res.status(code).json(dataResponse);
};

module.exports = sendResponds;
