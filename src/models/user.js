const mongoose = require('mongoose');
const Validate=require("validator") //importing validator module
const bcrypt=require("bcrypt") //importing bcrypt module for password hashing
const jwt=require("jsonwebtoken") //importing jsonwebtoken module for token generation
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50,
        minLength:3,
    },
    lastName:{
        type:String,
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!Validate.isEmail(value)){
                throw new Error("Enter a valid Email"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!Validate.isStrongPassword(value)){
                throw new Error("Enter a Strong password with 1 lowercase 1 uppercase a number a special character and 8 letters ")
            }
        }
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:99,
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            if(value!=="male" && value!=="female" && value!=="other"){
                throw new Error("Invalid Gender value")
            }
        }
    },
    photo:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.VWwq2xtthMXiOFa4IuqAwwHaHa?rs=1&pid=ImgDetMain",
        validate(value){
            if(!Validate.isURL(value)){
                throw new Error("Enter a valid URL"+value)
            }
        }
    }
    ,bio:{
        type:String,
        default:"This is About me",
        maxLength:500,
    },
    skills:{
        type:[String],
    }
},{timestamps:true})
UserSchema.methods.getJWT=async function(){
    const user=this; //get user object
    const token=await jwt.sign({_id:user._id},"Devmatch123@$",{
        expiresIn:"7days" //set token expiration time to 7 days
    }) //create a JWT token with user ID and secret key
    return token; 
}



const User=mongoose.model("User",UserSchema);

module.exports={User};