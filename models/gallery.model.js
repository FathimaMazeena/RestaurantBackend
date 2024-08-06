const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: ['Food', 'Ambiance', 'Restaurant'],
            required: false
        },

        tags: {
            type: [String], 
            required: false
        },

        dateUploaded: {
            type: Date,
            default: Date.now,
            required: false
        },

        uploadedBy: {
            type: String, // User ID or username
            required: false
        },

        order: {
            type: Number, // Display order
            required: false
        },

        visibility: {
            type: Boolean,
            default: true, // Visible by default
            required: false
        }
    },
    { timestamps: true }
);

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;

