const express=require('express');
const app=express();
    //playing with multiple route handlers
app.get("/user",[(req, res,next)=>{
    console.log("Hello User 1!");
    next();
},(req,res,next)=>{
    console.log("Hello User 2!");
    next();
},(req,res,next)=>{
    console.log("Hello User 3!");
    next();
},(req,res,next)=>{
    console.log("Hello User 4!");
    //res.send("4th response!");
    next();
},(req,res,next)=>{
    console.log("Hello User 5!");
    res.send("Final Response!");
}]);

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});