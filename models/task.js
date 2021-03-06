const Joi = require("joi");
const mongoose = require("mongoose");

mongoose.Schema.Types.String.checkRequired(v => v != null);
const Task = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    createDate: {
      type: Date,
      default: Date.now
    },
    isFinished: Boolean
  })
);

function validateTask(task) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    userId: Joi.objectId(),
    categoryId: Joi.objectId().required(),
    createDate: Joi.date(),
    isFinished: Joi.boolean()
  };

  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
