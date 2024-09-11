const mongoose = require ('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'Name field is required']

        },

        username:{
            type: String,
            required: true,
            unique:true
        },

        password:{
            type: String,
            required: true

        },

        usertype:{
            type:String,
            required:false,
            enum: ['admin', 'customer', 'staff'],
            default: 'customer'
        
        },

        email:{
            type: String,
            required: true,
            unique:true

        },

        address:{
            type: String,
            required: true
        },

        phone:{
            type: String,
            required: true
        }
    },

    {timestamps:true

    }
);

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User=mongoose.model('User', UserSchema);

module.exports=User;
