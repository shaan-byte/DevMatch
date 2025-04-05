const express=require('express');
const app=express();

const {Authadmin,Authuser}=require("./middlewares/src.js")  //importing admin and user auth middlewares

//Authadmin for all admin middlewares

app.use("/admin",Authadmin);
app.use("/admin/getAllData",(req,res)=>{
    res.send("Fetched all data for admin");
})

app.use("/admin/deleteAllData",(req,res)=>{
    res.send("Deleted all data for admin");
})

app.use("/user/data",Authuser,(req,res)=>{
    res.send("Fetched user data successfully");
})  //authuser only for user data hence passed as argument

app.use("/user/login",(req,res)=>{
    res.send("User login successful");
})  //auth user not required

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});