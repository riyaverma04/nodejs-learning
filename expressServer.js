const express = require('express');

const app = express();

app.use('/test', (res, req)=>{
    res.send("namaste developers")
})

app.listen(3000, ()=>{
    console.log("port is successfully listening at 3000 port.")
})