const express=require('express');
const app=express();

const {connectDB}=require('./config/database')
const {User}=require("./models/user")
app.use(express.json());//convert incoming request body to json format

app.post("/Signup",async (req,res)=>{
    console.log(req.body);
    //creating a new instance of the user model
    const Userobj=new User(req.body);   //dynamic user data adding 
    try{
       const result= await Userobj.save()
        console.log("Saved user:", result);
        res.status(200).send("User saved successfully")
    }catch(err){
        res.status(500).send("Error saving user",err.message)
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
        res.status(500).send("Error retrieving user",err.message)
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

connectDB().then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});
}).catch((err)=>{
    console.error("MongoDB connection failed", err);
});
