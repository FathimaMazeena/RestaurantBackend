const mongoose = require ('mongoose');
const Schema=mongoose.Schema;

const ServiceSchema=new Schema(

    {
       name:{
        type:String,
        required:true

       },

       description:{
        type:String,
        required:true
       },

       image:{
        type:String,
        required:false
       }
       
    }
);



const Service=mongoose.model('Service', ServiceSchema);

module.exports=Service;
