const mongoose = require ('mongoose');
const Schema=mongoose.Schema;

const QuerySchema = new Schema(
    {
        userId:{
            type: String,
            required: true

        },

        queryText:{
            type: String,
            required: true
        },

        staffId:{
            type: String,
            required: true

        },


        responseText:{
            type: String,
            required: true

        }

        
    },

    {timestamps:true

    }
);


const Query=mongoose.model('Query', QuerySchema);

module.exports=Query;
