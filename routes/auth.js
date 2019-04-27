const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

/**
 * @api {post} /api/auth Authenticate the user
 * @apiName AuthUser
 * @apiGroup Auth
 *
 * @apiParam {String} login Users login.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {String} JWT JSON Web Token that identicates a user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2IwOThlODMwZWMxNTQ4NDRiNjFlNjMiLCJpYXQiOjE1NTUyMzk0NzN9.nlWHRXCbZZn7JdwyHmDvBtEQSvCPENRVxlw9TQdmzXA
 *
 * @apiError InvalidParams Invalid params sent.
 * @apiError UserNotFound The user with passed login address was not found.
 * @apiError InvalidPassword Invalid user password passed.
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    login: req.body.login
  });
  if (!user) return res.status(404).send("User not found!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("Invalid password!");

  res.send(user.generateAuthToken());
});

function validate(req) {
  const schema = {
    login: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
