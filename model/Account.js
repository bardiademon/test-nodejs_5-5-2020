const mongoose = require ('mongoose');

const AccountSchema = mongoose.Schema ({
    "username" : {
        type : String ,
        required : true
    } ,
    "password" : {
        type : String ,
        required : true
    } ,
    "created_at" : {
        type : Date ,
        default : Date.now
    }
});

export default mongoose.model ("account" , AccountSchema);