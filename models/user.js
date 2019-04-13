const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 8,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id
    }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        login: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;