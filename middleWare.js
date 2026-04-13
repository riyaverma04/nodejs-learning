const express = require('express');
const {authAdmin,authUser} = require('./middleware/auth');
const app = express();


app.use("/admin" ,authAdmin)
app.use("/user" ,authUser)
//     const adminAuth = token === "xyz";
//     if(adminAuth){
//         next();
//     }else{
//         res.status(401).send("unAuthorised admin access denied")
//     }


// })


app.get('/admin/getUserDetails',authAdmin ,(req,res)=>{
    //we need to authenticate admin first
    // const token = "xyz";
    // const adminAuth = token === "xyzdfd";
    // if(adminAuth){
    //     res.send("access to userDetailss")
    // }else{
    //     res.status(401).send("unAuthorised admin access denied")
    // }
     res.send("access to userDetailss")
    

})
app.get('/admin/deleteUser',authAdmin, (req,res) =>{
    //as we have many admin routes so we have to write many time same code to authenticate admin it is better to write it once and user whenever we need
    //here the middleware comes 
     res.send("deleted user")

})

app.get('/user/userDetails',authUser,(req,res) =>{
    // const
    res.send("access to user details")
    // 
});
//creating different user middleware helps in use it accordingly as authUser middleware is not needed in user login route as we are not checking user authentication in login route but we are checking in userDetails route so we can use authUser middleware in userDetails route and we cannot use authUser middleware in login route as it is not needed there
app.post('/user/login',(req,res)=>{
        res.send("user logged in successfully")
})


app.listen(7777,()=>{
    console.log("app is listening on server 7777")
})