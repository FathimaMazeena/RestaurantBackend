const mongoose = require ('mongoose');
const Schema=mongoose.Schema;


const ReservationSchema = new Schema(
    {
        userId:{

            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },

        reservationDate:{
            type: Date,
            required: true
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

        }
    },

    {timestamps:true

    }
);



const Reservation=mongoose.model('Reservation', ReservationSchema);

module.exports=Reservation;
