const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    productId: { 
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

        cartItems: [CartItemSchema],

        totalPrice: {
            type: Number,
            required: false,
            default: 0
        }
    },
    { timestamps: true }
);

// cartSchema.methods.calculateTotalPrice = function() {
//     this.totalPrice = this.items.reduce((acc, item) => {
//         return acc + (item.product.price * item.quantity); // Assuming product has a price field
//     }, 0);
//     return this.totalPrice;
// };

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
