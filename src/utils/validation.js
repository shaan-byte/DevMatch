const validator=require("validator") //importing validator module

const validatesignupdata=(req)=>{const {firstName,lastName,emailID,password}=req.body; //get email and password from request body

if(!firstName || !lastName || !emailID || !password){ //if any field is empty
    throw new Error("All fields are required")
}

if(!validator.isAlpha(firstName)){ //if first name is not alphabetic
    throw new Error("First name should be alphabetic")
}
if(!validator.isAlpha(lastName)){ //if last name is not alphabetic
    throw new Error("Last name should be alphabetic")
}
if(!validator.isEmail(emailID)){ //if email is not valid
    throw new Error("Enter a valid email")
}
if(!validator.isStrongPassword(password)){ //if password is not strong
    throw new Error("Password should be strong")
}
}
module.exports={validatesignupdata} //exporting function