
const userInfo = require('../models/userInfo');
const jwt = require('jsonwebtoken');

const authAdmin = (req, res,next)=>{
    const token = "xyz";
    const adminAuth = token === "xyz";
    if(adminAuth){
        next();
    }else{
        res.status(401).send("unAuthorised admin access denied")
    }

}
const authUser = async(req, res,next)=>{
    // const token = "xyz";
    // const userAuth = token === "xyz";
    // if(userAuth){
    //     next();
    // }else{
    //     res.status(401).send("unAuthorised user access denied")
    // }


    //get the token from the cookie and verify the token 
    try{
        const decodedToken = jwt.verify(req.cookies.token,"heyDeveloper@967$6738");
        if(!decodedToken){
            throw new Error("Invalid token");
        }
        //find the user id 
        const userId = decodedToken._id;
        //find the user from the database using the user id 
        const user = await userInfo.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();

    }catch(err){
        return res.status(400).json({ message: err.message });
    }

    }



//exporting this function
module.exports ={
    authAdmin,
    authUser
}