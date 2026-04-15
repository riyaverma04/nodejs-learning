const connectDB = require('./config/mongoose');
const express = require('express');
const UserInfo = require('./models/useInfo');


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



app.post("/user/signup",  (req, res) => {
    console.log(req.body);
    //  res.send("user signup route is working fine");

    // creating a new instance of UserInfo model 
    const newUser = new UserInfo({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age
    });
      newUser.save().then((savedUser) => {
        res.status(201).json(savedUser);
      }).catch((err) => {
        res.status(500).json({ error: err.message });
      });   
});


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

app.get('/user', async (req, res)=>{
    // const userId = req.params.id;
    try{
        const user = await UserInfo.find({});
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



