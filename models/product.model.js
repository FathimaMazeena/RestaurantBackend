const mongoose = require ('mongoose');
const Schema=mongoose.Schema;
const Category = require('./category.model');

const ProductSchema=new Schema(

    {
        productName:{
        type:String,
        required: [true, 'Name field is required']
        
       },

       image:{
        type:String,
        required:true

       },

       description:{
        type:String,
        required:true
       },
       
       price:{
        type:Number,
        required:true
       },

       ingredients:{
        type:[String],
        required:true
       },

       categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',//model of the categories collection not the collection(table) name
        required: false
    },

       stockLevel:{
        type:Number,
        required:true
       },

       outOfStockOrderCount: {
        type: Number,
        default: 0,
    }

    },

    {timestamps:true

    }
);

// //middleware to conver category name to categoryid before saving to the database
// ProductSchema.pre('save', async function(next) {
//     console.log('Pre-save middleware triggered');
    
//         // Find the category by its name
//         const category = await Category.findOne({ name: this.categoryName });
//         if (category) {
//             // Set the categoryId to the corresponding ObjectId
//             this.categoryId = category._id;
//             console.log('categoryId set to:', this.categoryId);
//         } else {
//             // Handle the case where the category is not found
//             return next(new Error('Category not found'));
//         }
    
//     next();
// });

const Product=mongoose.model('Product', ProductSchema);
module.exports=Product;

