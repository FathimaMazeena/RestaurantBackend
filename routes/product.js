const express = require('express');
const router = express.Router();
const{ addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductPreview
 } = require('../controllers/product.controller');
 //const { isAuth, isAdmin, isCustomer } = require('../index');

 

//public routes(accessible by all users)

//get all products
router.get('/products', getProducts);
//get products for home page
router.get('/products/preview' , getProductPreview);
//get a single product
router.get('/products/:id', getProduct);


//protected routes(accessible by authenticated users)

//Add a new product
router.post('/products', addProduct);
//delete product
router.delete('/products/:id', deleteProduct );
//update product
router.patch('/products/:id', updateProduct);



module.exports=router;