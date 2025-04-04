const express=require('express');
const app=express();

app.get("/user",(req,res)=>{
    res.send({firstname:"Shaan",lastname:"Qureshi",age:22,city:"Bhopal"});
})

app.post("/user",(req,res)=>{
    res.send("Posted Successfully TO the DB");
});

app.put("/user",(req,res)=>{
    res.send("Updated Successfully in the DB using PUT");
})

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully from the DB using DELETE");
})

app.patch("/user",(req,res)=>{
    res.send("Updated Successfully in the DB using PATCH");
})
app.use("/test",(req,res)=>{
    res.send("Hello World!");
})


app.listen(7777,()=>{
    console.log("Server is running on port 7777");
});