const Joi = require('joi');
const mongoose = require('mongoose');

const Task = mongoose.model('Tasks', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    isFinished: Boolean
}));

function validateTask(task) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        description : Joi.string().max(255).required(),
        userId: Joi.objectId(),
        createDate: Joi.date(),
        isFinished: Joi.boolean()
    };

    return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;