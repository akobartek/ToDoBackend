const Joi = require("joi");
const mongoose = require("mongoose");

mongoose.Schema.Types.String.checkRequired(v => v != null);
const Category = mongoose.model(
  "Categories",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    createDate: {
      type: Date,
      default: Date.now
    }
  })
);

function validateCategory(category) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .allow("")
      .max(255)
      .required(),
    userId: Joi.objectId(),
    createDate: Joi.date()
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;
