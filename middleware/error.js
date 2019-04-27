const winston = require("winston");

// Handle exceptions from Express
module.exports = function(err, req, res, next) {
  winston
    .createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: "errors.log"
        })
      ]
    })
    .error(err.message, err);

  res.status(500).send("Something failed");
};
