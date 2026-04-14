const mongoose = require('mongoose');


const {Schema} = mongoose;

const userSChema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true, 
    },
    gender:{
        type: String,
        enum :["male", "female", "other"],
    }
    , age:{
        type: Number,
        required: true, 
    }
    
})
 module.exports = mongoose.model("UserInfo", userSChema);
