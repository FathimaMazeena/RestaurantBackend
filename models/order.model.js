const mongoose = require ('mongoose');
const Schema=mongoose.Schema;


const ProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { _id: false })



const OrderSchema = new Schema(
    {
        userId:{

            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },

        products: [ProductSchema],

        status:{
            type: String,
            required: false,
            enum: ['pending', 'confirmed', 'successful'],
            default: 'pending'
        },

        delivery:{
            type: Boolean,
            required: true,
            default:true
        }
    },

    {timestamps:true

    }
);

//TODO middleware to calculate the payment for the order
//TODO middleware to add delivary charge based on the address
//TODO middleware to calculate the discount and final amount based on the promo code entered
//TODO middleware to add payment record to payment table once the order is placed



const Order=mongoose.model('Order', OrderSchema);

module.exports=Order;
