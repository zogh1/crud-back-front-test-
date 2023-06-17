const { Product } = require('../Models/Product');
const Joi = require('joi');

const productValidationSchema = Joi.object({
  title: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z\\s]+$'))
    .min(1)
    .max(50)
    .messages({
      'string.pattern.base': 'Sorry, the name should contain only letters',
    }),
  description: Joi.string()
    .required()
    .min(6)
    .max(255)
    .messages({
      'string.min': 'Sorry, the description should be at least 10 characters long',
      'string.max': 'Sorry, the description should not exceed 255 characters',
    }),

});





const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { title, description } = req.body;

      const validationResult = productValidationSchema.validate({
        title,
        description,

      });

      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
      }

      const newProduct = new Product({
        title,
        description,

      });

      const savedProduct = await newProduct.save();

      res.json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { _id } = req.params;
      const { title, description } = req.body;

      const validationResult = productValidationSchema.validate({
        title,
        description,
      });

      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id },
        { title, description },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },


  deleteProduct: async (req, res) => {
    try {
      const { _id } = req.params;

      const deletedProduct = await Product.findOneAndDelete({ _id });

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }


  },


  getProductById: async (req, res) => {
    try {
      const { _id } = req.params;

      const product = await Product.findOne({ _id: _id.trim() });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },




  searchProducts: async (req, res) => {
    try {
      const { title } = req.query;
      let searchOptions = {};

      if (title) {
        searchOptions.title = { $regex: title, $options: 'i' };
      }



      const products = await Product.find(searchOptions);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

};

module.exports = productController;
