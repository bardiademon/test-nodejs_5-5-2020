const mongoose = require ('mongoose');

const loginSchema = mongoose.Schema ({
    account_id : {
        type : String ,
        required : true
    } ,
    create_at : {
        type : Date ,
        default : Date.now
    }
});

export default mongoose.model ("login" , loginSchema);