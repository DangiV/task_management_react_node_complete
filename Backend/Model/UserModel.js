import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    fName : {
        type : String,
        required : true
    },
    lName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
})

const UserDetails = mongoose.model('machinetest', UserModel);

export default UserDetails;