const express = require('express');
const router = express.Router();
const{ addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductPreview
 } = require('../controllers/product.controller')


//get all products
router.get('/products', getProducts);

//get products for home page
router.get('/products/preview' , getProductPreview);

//Add a new product
router.post('/products', addProduct);

//get a single product
router.get('/products/:id', getProduct);

//delete product
router.delete('/products/:id',deleteProduct );

//update product
router.patch('/products/:id', updateProduct);

module.exports=router;