const express = require("express");
const categories = require("../routes/categories");
const tasks = require("../routes/tasks");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const cors = require("../middleware/cors");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors);
  app.use("/api/categories", categories);
  app.use("/api/tasks", tasks);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
