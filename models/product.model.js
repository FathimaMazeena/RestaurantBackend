const mongoose = require ('mongoose');
const Schema=mongoose.Schema;


const ProductSchema=new Schema(

    {
       name:{
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
        required:false
       },

       categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

       stockLevel:{
        type:Number,
        required:true
       },

       outOfStockOrderCount: {
        type: Number,
        default: 0,
        required: true
    }

    },

    {timestamps:true

    }
);


const Product=mongoose.model('Product', ProductSchema);

module.exports=Product;