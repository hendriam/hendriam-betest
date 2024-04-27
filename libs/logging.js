const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;
const level = "debug";

const logger = winston.createLogger({
    level: level,
    format: "YYYY-MM-DD HH:mm:ss",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        colorize({ level: true }),
        printf((opts) => {
            return `[${opts.timestamp}] ${opts.level}: ${opts.message}`;
        })
    ),
    transports: [new winston.transports.Console()],
});

module.exports = logger;
