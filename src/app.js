const express=require('express');
const app=express();

app.use('/sara',(req,res)=>{
    res.send("Sara is my sister!");
})

app.use("/shaan",(req,res)=>{
    res.send("Shaan is my brother!");
})

app.use("/",(req,res)=>{
    res.send("Hello World!");
})


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});