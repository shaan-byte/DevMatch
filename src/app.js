const express=require('express');
const app=express();

const {connectDB}=require('./config/database')
const {User}=require("./models/user")
const {validatesignupdata}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {Authuser}=require("./middlewares/Auth") //importing auth middleware
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
        const token=await user.getJWT();
        res.cookie("token",token)
        res.status(200).send("Login successful") //if login is successful
    }}catch(err){
        res.status(500).send("Error logging in "+err.message) //if error occurs
    }
})

app.get("/Profile",Authuser,async (req,res)=>{
  try{const cookie=req.cookies; 
    const user=req.user; //get user from request object
    if(!user){
        throw new Error ("User not found") //if user not found
    }else{
        res.status(200).send(user) //if user found, send user data
    }}catch(err){
        res.status(500).send("Error retrieving user"+err.message) //if error occurs
    }
})

app.post("/Sendconnectionrequest",Authuser,async (req,res)=>{
    const user=req.user; //get user from request object
    res.status(200).send(`${user.firstName} sent a connection request`) //if connection request is sent successfully
})


connectDB().then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});
}).catch((err)=>{
    console.error("MongoDB connection failed", err);
});
