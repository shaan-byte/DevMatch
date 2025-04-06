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

connectDB().then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});
}).catch((err)=>{
    console.error("MongoDB connection failed", err);
});
