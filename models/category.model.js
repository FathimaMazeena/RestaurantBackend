const mongoose = require ('mongoose');
const Schema=mongoose.Schema;

const CategorySchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'Name field is required'],
            unique: true

        },

        description:{
            type: String,
            required: true
        },

        slug: {
            type: String,
            required: false 
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
            required: true
        }

        

    },

    {timestamps:true

    }
);

CategorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase().replace(/ /g, '-');
    }
    next();
});

const Category=mongoose.model('Category', CategorySchema);

module.exports=Category;
