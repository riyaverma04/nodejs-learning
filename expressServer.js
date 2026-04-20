const connectDB = require('./config/mongoose');
const express = require('express');
const UserInfo = require('./models/useInfo');
const { validateSignUpData, validateLoginData } = require('./utils/validation');
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const app = express();
//this .use let all kind of request to be handled by the callback function, it can be get, post,put, delete,patch, optons, head, trace, connect, all    

// app.use('/test', (req, res)=>{
//     //this will handle all the request which is coming to /test route
//     const queryParams = req.query; //this will give us the query parameters in the url, it will be an object

//     console.log(queryParams)
//     res.send("namaste developers")
// })
// app.use('/hello/:username/:age',(req, res,next) =>{
//     const { username, age } = req.params; //this will give us the route parameters in the url, it will be an object
//     next();
//     res.send(`Hello, ${username}! You are ${age} years old.`);
// },(req,res)=>{
//     res.send("this is the second callback function");
// })

// app.use('/test',(req, res ,next) =>{
//     //route handler for /test route
//     next();
//     res.send("test server is working fine");
//     //to send the response from second callback function we have next parameter in the first callback function, we can call next() to move to the second callback function
//     //but remember that we can only send one response for one request, so if we send response in the first callback function then we cannot send response in the second callback function, it will give us an error, so we have to use next() to move to the second callback function without sending response in the first callback function
    
// },(req,res,next) =>{
//     //this is the second callback function for /test route, it will be executed after the first callback function
//     console.log("this is the second callback function for /test route"); 
   
     

// });

// app.use('/hello',(req, res) =>{

//     res.send("welcome to express server");
// })


// middleware to parse JSON
app.use(express.json());
app.use(cookieParser());



app.post("/user/signup", async (req, res) => {
    console.log(req.body);
    //  res.send("user signup route is working fine");
   try{
     validateSignUpData(req);
     
    const userPassword = req.body.password;
    if(!userPassword){
        throw new Error("please enter password");
    }
    // creating a new instance of UserInfo model 
    const bcryptPassword = await bcrypt.hash(userPassword, 10);
    console.log(bcryptPassword);
     
    const newUser = new UserInfo({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcryptPassword,
        gender: req.body.gender,
        age: req.body.age
    });
     await newUser.save()
     //showing the data with hashedpassword in not premitted so need to delete the password first then send it to the res but mongoose data is not a javascript object so we need to convert it to object thenonly we can delete the password from that object and send response 
     const userResponse = newUser.toObject();
     delete userResponse.password;
       
        res.status(201).json(userResponse);
      }catch(err)  {
        res.status(500).json({ error: err.message });
      };   
});


app.post("/login",async (req, res)=>{
    try{
        const {email, password} = req.body;
        //valid the input email
        if(!validator.isEmail(email)){
                throw new Error("Email is not valid!");
        
            }

        //find the input email present in db or not
        const userPresent = await UserInfo.findOne({email});
        const {_id } = userPresent;
        console.log(userPresent)
        if(!userPresent){
            throw new Error("This email is not register signup first");
        }
        console.log(password, userPresent.password)

        //passoword compare
        const isPasswordValid = await  bcrypt.compare(password, userPresent.password);
        //geneate token from jwt 
        const token =  await jwt.sign({_id}, "heyDeveloper@967$6738", {expiresIn: "1h"});

        if(!isPasswordValid){
            throw new Error("password is not valid");
        }
        else{
            //add the token to the cookie and send respoonse to the client
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
            console.log(req.cookies);
            res.status(200).send("user login successfully")
        }

        

    }catch(err){
        res.status(500).send("Error"+ err.message);

    }

})


//delete user

app.delete("/user/delete/:id", async (req, res) =>{
    const userId = req.params.id;
    try{
        const deletedUser = await UserInfo.findByIdAndDelete(userId);
        res.status(200).json(deletedUser);


    }catch(err){
        res.status(500).send(err);
    }
})




//update user

app.patch('/user/update/:id',async (req, res)=>{
    const userId = req.params.id;
    try{

        //we want user to update only few fields that need to be restricted
        const ALLOW_UPDATE = ["passward", "gender", "firstName", "lastName"];
        const isAllowUpdate = Object.keys(req.body).every((k)=>{
            ALLOW_UPDATE.includes(k);
        });
        if(!isAllowUpdate){
            throw new Error("update is not valid");
        }
        const updatedUser = await UserInfo.findByIdAndUpdate(userId,req.body,{ new: true ,runValidators: true });
         if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).send(err.message);
    }


})





//get user 

app.get('/profile', async (req, res)=>{
    // const userId = req.params.id;
    try{
        // const user = await UserInfo.find({});
        //verify the token from the cookie and get the user id from the token
        const decodedToken = await jwt.verify(req.cookies.token, "heyDeveloper@967$6738");
        if(!decodedToken){
            throw new Error("Invalid token");
        }
        console.log(decodedToken);
        const profileId = decodedToken._id;
        const user = await UserInfo.findById(profileId);

        if(!user){
            return res.status(404).json({"message":"User not found"});  
        }
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err.message);
    }
})







connectDB().then(()=>{
    console.log("connected to the database successfully");
    app.listen(5000, ()=>{
    console.log("port is successfully listening at 5000 port.")
})
}).catch((err)=>{
    console.log("error while connecting to the database", err);
})



