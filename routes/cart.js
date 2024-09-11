const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
//const { addToCart } = require('../controllers/cart.controller');



//view my-cart by customer
router.get('/cart', async (req, res) => {
    try {
        // Get the userId from the session
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId: userId }).populate('cartItems.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//add products to the cart by the customer
router.post('/cart', async (req, res) => {
    const { productId, quantity } = req.body;

    try {

        const userId = req.session.userId;
        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            // If the user has no cart, create a new one
            cart = new Cart({ userId: userId, cartItems: [] });
        }

        // Check if the product already exists in the cart
        const existingItem = cart.cartItems.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // Update the quantity of the existing item
            existingItem.quantity += quantity;
        } else {
            // Add the new product to the cart
            cart.cartItems.push({ productId: productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item added to cart', cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});




// //TODO update product quantity of cart items by customer
// router.put('/cart/:id', (req, res)=>{
//     Cart.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//         Cart.findOne({_id:req.params.id}).then(function(cart){
//             res.send(cart);
//         });
        
//     });
// });

// //delete cart items by the customer
// router.delete('/cart/:id', (req, res)=>{
//     Cart.findByIdAndDelete({_id:req.params.id}).then(function(cart){
//         res.send(cart);
//     });
// });


module.exports=router;