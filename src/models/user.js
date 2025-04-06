const mongoose = require('mongoose');

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
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:20,
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
        default:"https://th.bing.com/th/id/OIP.VWwq2xtthMXiOFa4IuqAwwHaHa?rs=1&pid=ImgDetMain"
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

const User=mongoose.model("User",UserSchema);

module.exports={User};