const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema(
    {
        image: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        menuItems: {
            type: [Schema.Types.ObjectId],
            ref: 'dish',  
            required: true
        },

        price: {
            type: Number,
            required: [true, 'Price field is required'],
            min: [0, 'Price must be a positive number']
        },

        portion: {
            type: String,
            required: true,
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

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
