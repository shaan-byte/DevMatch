const express=require('express');
const app=express();

const {connectDB}=require('./config/database')
const {User}=require("./models/user")

app.post("/Signup",async (req,res)=>{
    const Userobj=new User({
        firstName:"Aakash",
        lastName:"Jain",
        emailID:"akash@gmail.com",
        age:22,
        gender:"Male"
    })
    try{
       const result= await Userobj.save()
        console.log("Saved user:", result);
        res.status(200).send("User saved successfully")
    }catch(err){
        res.status(500).send("Error saving user",err.message)
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
