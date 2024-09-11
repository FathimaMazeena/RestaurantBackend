const mongoose = require ('mongoose');
const Schema=mongoose.Schema;

const QuerySchema = new Schema(
    {
        userId:{
            type: String,
            required: false

        },

        name:{

            type: String,
            required: true
        },

        email:{

            type: String,
            required: true
        },



        queryText:{
            type: String,
            required: true
        },

        staffId:{
            type: String,
            required: false

        },


        responseText:{
            type: String,
            required: false

        }

        
    },

    {timestamps:true

    }
);


const Query=mongoose.model('Query', QuerySchema);

module.exports=Query;
