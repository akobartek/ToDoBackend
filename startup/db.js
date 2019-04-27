const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function() {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true
    })
    .then(() =>
      winston
        .createLogger({
          format: winston.format.simple(),
          transports: [new winston.transports.Console()]
        })
        .info(`Connected to ${config.get("db")}`)
    );
};
