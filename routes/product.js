const express = require('express');
const router = express.Router();
const{ addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
 } = require('../controllers/product.controller')


//get all products
router.get('/products', getProducts);

//Add a new product
router.post('/products', addProduct);

//get a single product
router.get('/products/:id', getProduct);

//delete product
router.delete('/products/:id',deleteProduct );

//update product
router.patch('/products/:id', updateProduct);

module.exports=router;