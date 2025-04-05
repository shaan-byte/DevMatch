const express=require('express');
const app=express();

app.use("/getalldata",(req,res,next)=>{
    try{
    throw new Error("This is an error");    //error handling middleware with try catch and throw
    res.send("DATA FETCHED");}
    catch(err){
        res.status(500).send("Internal server error") ;
    }
})

// app.use("/",(err,req,res,next)=>{
//     if(err){
//     res.status(500).send("Internal server error");
//     }                                                   //alternate way to handle error with wildcard / matching
// })

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});