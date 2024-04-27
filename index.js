const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// intial library logging
const logger = require("./libs/logging.js");

// initial package mongoose & config database
const mongoose = require("mongoose");
const dbConfig = require("./config/database.js");

// Connecting to the database
mongoose
    .connect(dbConfig.url)
    .then(() => {
        logger.info(`[MongoDB] Successfully connected to the database`);
    })
    .catch((err) => {
        logger.error(
            `[MongoDB] Could not connect to the database. Exiting now... ${err}`
        );
        process.exit();
    });

// Initial bodyParser package
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

// Initial route file
const route = require("./routes/route.js");
route(app);

app.listen(port);

logger.info(`Server running at http://localhost:${port}/`);
