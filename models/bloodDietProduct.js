const { Schema, model } = require('mongoose');
const Joi = require('joi');

const bloodDietProductsSchemaModel = Schema(
  {
    categories: {
      type: Array,
    },
    weight: {
      type: Number,
    },
    title: {
      type: Object,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

const BloodDietProduct = model('product', bloodDietProductsSchemaModel);

const getBloodDietSchema = Joi.object({
  height: Joi.number().integer().min(100).max(250).required(),
  age: Joi.number().integer().min(18).max(100).required(),
  curWeight: Joi.number().integer().min(20).max(500).required(),
  desWeight: Joi.number().integer().min(20).max(500).required(),
  bloodType: Joi.number().integer().required(),
});

module.exports = { BloodDietProduct, getBloodDietSchema };
