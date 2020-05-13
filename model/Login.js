import mongoose from "mongoose";

const LoginSchema = mongoose.Schema ({
    "account" : {
        type : mongoose.Types.ObjectId ,
        // required : true
    } ,
    "create_at" : {
        type : Date ,
        default : Date.now
    }
});

export default mongoose.model ("logins" , LoginSchema);