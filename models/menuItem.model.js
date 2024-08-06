const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema(
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
        }
    },
    { timestamps: true }
);

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;
