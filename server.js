const http = require("node:http");

const server = http.createServer((req, res)=>{



    res.end("Hello world");
})


server.listen(3000, ()=>{
    console.log("server is running on port 3000");
})




// VDORvmNkA9Oyu0FA