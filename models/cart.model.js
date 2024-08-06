const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    productId: {  // Changed from cartItem to productId for clarity
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    }

}, { _id: false });

const CartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        cartItems: [CartItemSchema]
    },
    { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
