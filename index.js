const winston = require("winston");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
// if (process.env.NODE_ENV === 'production')
require("./startup/prod")(app);

app.use(express.static(__dirname + "/apidoc"));
app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/apidoc/index.html");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston
    .createLogger({
      format: winston.format.simple(),
      transports: [new winston.transports.Console()]
    })
    .info(`Listening on port ${port}...`)
);

module.exports = server;
