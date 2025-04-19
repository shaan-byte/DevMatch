const express=require('express');
const app=express();

const {connectDB}=require('./config/database')
const {User}=require("./models/user")
const {validatesignupdata}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
app.use(express.json());//convert incoming request body to json format
app.use(cookieParser()) //parse cookies from incoming requests


app.post("/Signup",async (req,res)=>{
    //validate the signup data
    try{validatesignupdata(req); //validate the signup data

    //encrypt the password
    const {firstName,lastName,emailID,password,age,gender}=req.body; //get password from request body
    const hashpassword=await bcrypt.hash(password,10); //hash the password with 10 rounds of salting
    //add user data
    const Userobj=new User({
        firstName,lastName,emailID,password:hashpassword,age,gender //create a new user object with the data from request body
    });   
    
       const result= await Userobj.save()
       // console.log("Saved user:", result);
        res.status(200).send("User saved successfully")
    }catch(err){
        res.status(500).send("Error saving user"+err.message)
    }
})

//login API
app.post("/Login",async (req,res)=>{
    try{const {emailID,password}=req.body; //get email and password from request body
    const user=await User.findOne({emailID:emailID}) //find user by emailID
    if(!user){
        throw new Error("Invalid Credentials") //if user not found
    }
    const ispasswordvalid=await bcrypt.compare(password,user.password) //compare the password with the hashed password
    if(!ispasswordvalid){
        throw new Error("Invalid Credentials") //if password is not valid
    }else{
        //if password is valid, create a JWT token and send it in the response
        const token=jwt.sign({_id:user._id}, "Devmatch123@$")
        res.cookie("token",token)
        res.status(200).send("Login successful") //if login is successful
    }}catch(err){
        res.status(500).send("Error logging in "+err.message) //if error occurs
    }
})

app.get("/Profile",async (req,res)=>{
  try{const cookie=req.cookies; 
    //get token from cookies
    const token=cookie.token;
    if(!token){
        throw new Error("Unauthorized Invalid token") //if token is not present in cookies
    }
    //verify the token
    const decoded=await jwt.verify(token,"Devmatch123@$")
    //find user by ID
    const {_id}=decoded; //get user ID from decoded token
    const user=await User.findById(_id) //find user by ID
    if(!user){
        throw new Error ("User not found") //if user not found
    }else{
        res.status(200).send(user) //if user found, send user data
    }}catch(err){
        res.status(500).send("Error retrieving user"+err.message) //if error occurs
    }
})

app.get("/User", async (req,res)=>{         //find data via email and GET
    const email=req.body.emailID;           //get email from request body
    try{
        const Users=await User.find({emailID:email});   //find user by emailID
        if(Users.length===0){
            //if no user found with the given emailID
            res.status(404).send("User not found")
        }else{
            res.send(Users)
        }
    }catch(err){
        res.status(500).send("Error retrieving user"+err.message)
    }
})

//feed API for Users
app.get("/feed",async (req,res)=>{
    try{
        const users=await User.find({});  //find all users
        if(!users){
            res.status(404).send("No users found")
    }else{
        res.send(users)
    }
}catch(err){
    res.status(500).send("Error retrieving users"+err.message)
}})

app.delete("/User",async (req,res)=>{
    const userid=req.body.userid;
try{
    const result=await User.findByIdAndDelete(userid); //find user by ID and delete
    if(!result){
        res.status(404).send("User not found")
}else{
    res.send("User deleted successfully")
}
}catch(err){
    res.status(500).send("Error deleting user"+err.message)
}
})

app.patch("/User/:userid",async (req,res)=>{
    const userid=req.params?.userid; //get user ID from request body
    const data=req.body; //get data from request body
    try{
        const ALLOWED_UPDATES=["photo","bio","skills","age"] //allowed updates for user
        const isupdateallowed=Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key)) //check if the update is allowed
        if(!isupdateallowed){
            throw new Error("Invalid updates")
        }
        if(data.skills && data.skills.length>10){ //check if the skills array length is greater than 5
            throw new Error("Skills array length should not be greater than 10")
        }
        const user=await User.findByIdAndUpdate(userid, data,{runValidators:true})   //find user by emailID and update
        if(!user){
            res.status(404).send("User not found")
            }else{
                res.send("User updated successfully")
        
    }
}catch(e){
    res.status(500).send("Error updating user"+e.message)
}
})


connectDB().then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});
}).catch((err)=>{
    console.error("MongoDB connection failed", err);
});
