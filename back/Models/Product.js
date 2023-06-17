const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
 
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
  productValidationSchema,
};
