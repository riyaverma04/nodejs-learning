const crypto = require("node:crypto");
console.log("hello world");
let a = 27393;
let b = 6789;




//this is asynchronous code. it will not block the execution of the next line of code. v8 engine senout to the libuv thread pool it will run in the background and when it is done, it will call the callback function. in this case, it will print "key is generated" after the key is generated. we can also use promises and async/await to handle asynchronous code in a more elegant way.
crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err , derivedKey) => {
    console.log("primary key is generated");

});



//this is synchronous code. It will block the execution of the next line of code until it is done. v8 engine will run this code in the main thread and it will not move to the next line of code until it is done. in this case, it will print " second key is generated" after the key is generated. we should avoid using synchronous code in node.js as it can block the event loop and make the application unresponsive. we can use asynchronous code instead to avoid blocking the event loop.
crypto.pbkdf2Sync("password", "salt", 10000000, 64, "sha512");
console.log("second key is generated");


function mulitply(a,b){
    return a*b;
};

let c = mulitply(a,b);
console.log(c);




//output of the this file  is : hello world
// second key is generated
// 185971077
// primary key is generated