const express = require('express');

const app = express();
//this .use let all kind of request to be handled by the callback function, it can be get, post,put, delete,patch, optons, head, trace, connect, all    

app.use('/test', (req, res)=>{
    //this will handle all the request which is coming to /test route
    const queryParams = req.query; //this will give us the query parameters in the url, it will be an object

    console.log(queryParams)
    res.send("namaste developers")
})
app.use('/hello',(req, res) =>{
    res.send("hello world");
})

app.use('/',(req, res) =>{
    res.send("welcome to express server");
})

app.listen(3000, ()=>{
    console.log("port is successfully listening at 3000 port.")
})