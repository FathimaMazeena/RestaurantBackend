const mongoose = require ('mongoose');
const Schema=mongoose.Schema;


const ReservationSchema = new Schema(
    {
        userId:{

            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false

        },

        email:{
            type: String,
            required: true

        },

        name:{
            type: String,
            required: true

        },


        reservationDate:{
            type: Date,
            required: true,
            set: v => new Date(v)
        },

        numberOfPeople:{
            type: Number,
            required: true

        },

        time:{

            hour:{
                type:String,
                required:true,
            },

            minute:{
                type:String,
            required:true,
            }
            
        
        },

        specialRequests:{
            type: String,
            required: false

        },

        status: {
            type: String,
            enum: ['active', 'canceled'],
            default: 'active'
        }
    },

    {timestamps:true

    }
);



const Reservation=mongoose.model('Reservation', ReservationSchema);

module.exports=Reservation;
