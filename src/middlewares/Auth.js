const jwt=require("jsonwebtoken"); //importing jsonwebtoken library
const {User}=require("../models/user"); //importing user model
const Authuser=async (req,res,next)=>{
    //read token from req cookies
    try{const cookie=req.cookies;
    const {token}=cookie; //get token from cookies
    if(!token){
        throw new Error("Unauthorized Invalid token") //if token is not present in cookies   
    }  
    //verify the token
    const decodedobj=jwt.verify(token,"Devmatch123@$") //verify the token using secret key
    //find user by ID
    const {_id}=decodedobj; //get user ID from decoded token
    const user=await User.findById(_id) //find user by ID
    if(!user){
        throw new Error ("User not found") //if user not found
    }
    req.user=user; //set user in request object
    next();
    }catch(err){
        res.status(401).send("Auth Failed"+err.message) //if token is not present in cookies
    }
};

//User authentication middleware

module.exports={Authuser};