const Cart=require('../models/cart.model');

//TODO view my cart by customer

//add products to the cart by the customer
const addToCart = async (req , res) =>{
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.create({
            userId,
            cartItems: [{ productId, quantity }]
        });

        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error adding the item to the cart', error: error.message });
    }
}

//TODO update product quantity of cart items by customer

//delete cart items by the customer


module.exports={
    addToCart
}