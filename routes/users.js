const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {
    User,
    validate
} = require('../models/user');
const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/users Register new user
 * @apiName RegisterUser
 * @apiGroup Users
 * 
 * @apiParam {String} login Users login.
 * @apiParam {String} email Users email address.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {json} User JSON object that contains information about user. There is also a JWT in the response header (x-auth-token).
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "login": "userLogin",
 *          "email": "user@gmail.com"
 *      }
 *
 * @apiError InvalidParams Invalid params sent.
 * @apiError UserRegistered The user is already registered.
 */
router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('User already registered!');

    user = new User(_.pick(req.body, ['login', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.header('x-auth-token', user.generateAuthToken())
        .send(_.pick(user, ['_id', 'login', 'email']));
});

/**
 * @api {get} /api/users/me Get currently logged user
 * @apiName GetUser
 * @apiGroup Users
 * 
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiSuccess {json} User User JSON object that contains information about user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "login": "userLogin",
 *          "email": "user@gmail.com"
 *      }
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 */
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .select('-password -__v');
    res.send(user);
});

module.exports = router;