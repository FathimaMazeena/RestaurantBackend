const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema(
    {
        image: {
            type: String,
            required: [true, 'Image field is required']
        },

        item: {
            type: String,
            required: [true, 'Item field is required']
        },

        description: {
            type: String,
            required: [true, 'Description field is required']
        },

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },

        ingredients: {
            type: [String],
            required: false
        },

        price: {
            type: Number,
            required: [true, 'Price field is required'],
            min: [0, 'Price must be a positive number']
        },

        portion: {
            type: String,
            required: false,
            enum: ['small', 'medium', 'large']  
        },

        isActive: {
            type: Boolean,
            required: true,
            default:true
        }
    },
    { timestamps: true }
);

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;
