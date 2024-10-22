const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema(
    {
        image: {
            type: String,
            required: true
        },

        menuName: {
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
        },

        isTodaysMenu: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
