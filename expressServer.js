const express = require('express');

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

app.use('/test',(req, res ,next) =>{
    //route handler for /test route
    next();
    res.send("test server is working fine");
    //to send the response from second callback function we have next parameter in the first callback function, we can call next() to move to the second callback function
    //but remember that we can only send one response for one request, so if we send response in the first callback function then we cannot send response in the second callback function, it will give us an error, so we have to use next() to move to the second callback function without sending response in the first callback function
    
},(req,res,next) =>{
    //this is the second callback function for /test route, it will be executed after the first callback function
    console.log("this is the second callback function for /test route"); 
    next();
     

});

app.use('/hello',(req, res) =>{

    res.send("welcome to express server");
})

app.listen(3000, ()=>{
    console.log("port is successfully listening at 3000 port.")
})