const authAdmin = (res, req,next)=>{
    const token = "xyz";
    const adminAuth = token === "xyz";
    if(adminAuth){
        next();
    }else{
        res.status(401).send("unAuthorised admin access denied")
    }

}
const authUser = (res, req,next)=>{
    const token = "xyz";
    const userAuth = token === "xyz";
    if(userAuth){
        next();
    }else{
        res.status(401).send("unAuthorised user access denied")
    }

}

//exporting this function
module.exports ={
    authAdmin,
    authUser
}