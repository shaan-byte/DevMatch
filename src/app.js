const express=require('express');
const app=express();

const {connectDB}=require('./config/database')
const {User}=require("./models/user")
app.use(express.json());//convert incoming request body to json format

app.post("/Signup",async (req,res)=>{
    //creating a new instance of the user model
    const allowedFields = [
        "firstName",
        "lastName",
        "emailID",
        "password",
        "age",
        "gender",
        "photo",
        "bio",
        "skills"
    ];
    const isvalid=Object.keys(req.body).every((key)=>(allowedFields.includes(key))); //check if the request body contains only allowed fields
    if(!isvalid){
       throw new Error("Invalid fields in request body")
    }
    if(req.body.skills && req.body.skills.length>10){ //check if the skills array length is greater than 5
        throw new Error("Skills array length should not be greater than 10")
    }
    const Userobj=new User(req.body);   //dynamic user data adding 
    try{
       const result= await Userobj.save()
       // console.log("Saved user:", result);
        res.status(200).send("User saved successfully")
    }catch(err){
        res.status(500).send("Error saving user"+err.message)
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
    res.status(500).send("Error deleting user",err.message)
}
})

app.patch("/User/:userid",async (req,res)=>{
    const userid=req.params?.userid; //get user ID from request body
    const data=req.body; //get data from request body
    try{
        const ALLOWED_UPDATES=["userid","photo","bio","skills","age"] //allowed updates for user
        const isupdateallowed=Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key)) //check if the update is allowed
        if(!isupdateallowed){
            throw new Error("Invalid updates")
        }
        if(data.skills.length>10){ //check if the skills array length is greater than 5
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
