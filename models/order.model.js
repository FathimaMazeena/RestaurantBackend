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


        totalAmount: {
            type: Number,
            required: false
        },

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

//middleware to calculate the payment for the order



const Order=mongoose.model('Order', OrderSchema);

module.exports=Order;
