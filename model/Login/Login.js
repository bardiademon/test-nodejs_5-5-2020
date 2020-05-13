import mongoose from "mongoose";

const LoginSchema = mongoose.Schema ({
    account_id : {
        type : String ,
        required : true
    } ,
    create_at : {
        type : Date ,
        default : Date.now
    }
});

export default mongoose.model ("login" , LoginSchema);