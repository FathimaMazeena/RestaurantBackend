const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        image: {
            type:String,
            required: false

        },

        address: {

            number: { 
                type: String, 
                required: true 
            },

            street: { 
                type: String, 
                required: true 
            },

            townOrVillage: { 
                type: String, 
                required: false 
            },

            city: { 
                type: String, 
                required: false 
            },

            district: { 
                type: String, 
                required: true 
            }
 
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: { 
                type: Number, 
                required: true 
            },
            longitude: { 
                type: Number, 
                required: true 
            }
        },
        openingHours: {
            weekdays: { 
                type: String, 
                required: true 
            },
            weekends: { 
                type: String, 
                required: true 
            }
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
