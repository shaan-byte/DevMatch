const express=require('express');
const app=express();

app.get("/user/:userid/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstname:"Shaan",lastname:"Qureshi",age:22,city:"Bhopal"});
})

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});