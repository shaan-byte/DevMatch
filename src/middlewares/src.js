const Authadmin=(req,res,next)=>{
    const token="xyz";
    const isauthorized=token==="xyz";
    if(!isauthorized){
        res.status(401).send("Unauthorized access");
    }else{
        next();
    }
}   
//Admin authentication middleware

const Authuser=(req,res,next)=>{
    const token="abcab";
    if(token!="abc"){
        res.status(401).send("Unauthorized access for user");
    }else{
        next();
    }
};

//User authentication middleware

module.exports={Authadmin,Authuser};