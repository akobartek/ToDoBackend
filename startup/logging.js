const winston = require("winston");
const config = require("config");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  process.on("unhandledRejection", exc => {
    winston.error(exc.message, exc);
    process.exit(1);
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      level: "error"
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: config.get("db"),
      level: "error"
    })
  );

  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
      handleExceptions: true
    })
  );

  winston.add(
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
      handleExceptions: true
    })
  );
};
