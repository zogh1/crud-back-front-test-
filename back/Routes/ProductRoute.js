const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const Product = require('../Models/Product');

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:_id', productController.getProductById);

router.post('/createProduct', productController.createProduct);
router.put('/updateProduct/:_id', productController.updateProduct);
router.delete('/deleteProduct/:_id', productController.deleteProduct);
router.get('/search', productController.searchProducts);


module.exports = router;
