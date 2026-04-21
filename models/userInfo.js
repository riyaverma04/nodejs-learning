const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const {Schema} = mongoose;

const userSChema = new Schema({
    firstName : {
        type : String,
        required : true,
        minlength: [3, "First name must be at least 3 characters long"],
        maxlength:[15,"Password must be at most 15 characters long"],
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Name can't contain a number.")
            }
        }
        
    },
    lastName:{
        type: String,
        trim: true,
        
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address.")
            }
        }
        
    },

    password:{
        type: String,
        required: true, 
        minlength:[8,"Password must be at least 8 characters long"],
    
    },
    gender:{
        type: String,
        required: true,
        enum: {
      values: ['male', 'female' ,"other"],
      message: '{VALUE} is not a valid gender.'
    }
        
    }
    , age:{
        type: Number,
        required: true, 
    },
    profileUrl: {
        type: String,
        default: "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg"
    },
    skills:{
        type: [String],
    }
    
},{timestamps: true})


// attaching a method to every user document. this method will generate a jwt token for the user when they login and we can use this token to authenticate the user in the future requests. 
userSChema.methods.getJwt = async function(){
    // this Refers to the current user instance (the logged-in user).
    const user = this;
    const token = await jwt.sign({_id: user._id}, "heyDeveloper@967$6738", {expiresIn: "1d"});
    return token;
}



userSChema.methods.toValidatePassword = async function(password){
    const user = this;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}
 module.exports = mongoose.model("UserInfo", userSChema);
