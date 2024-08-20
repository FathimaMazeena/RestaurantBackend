const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema(
    {
        offer: {
            type: String,
            required: true
        },

        title:{
            type:String,
            required:true
        },

        promoCode: {
            type: String,
            required: true,
            unique: true
        },

        description: {
            type: String,
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        discountPercentage: {
            type: Number,
            required: true
        },

        termsAndConditions: {
            type: String,
            required: true
        },

        applicableItems: {
            type: [String], 
            required: true
        },

        minimumOrderValue: {
            type: Number,
            required: true
        },

        maximumDiscountAmount: {
            type: Number,
            required: true
        },

        claimedUsers: {
            type: [String],
            required: true
        },

        isActive: {
            type: Boolean,
            required: true
        }
    },

    {
        timestamps: true
    }
);

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
