const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ['cash', 'other']
        },

        paymentStatus: {
            type: String,
            required: true,
            enum: ['pending', 'completed']
        },

        paymentAmount: {
            type: Number,
            required: true
        },

        promoCode: {
            type: String,
            required: false,
        
        },

        discount: {
            type: Number,
            required: false,
            default: 0
        },

        finalAmount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;

