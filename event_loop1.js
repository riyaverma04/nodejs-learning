const fs = require('fs'); 

const a = 100;//memory heap
//asynchronous code will be sent to libuv and then libuv will send it to the callback queue and event loop will pick it up according to priority and give back to the call stack and it will execute immidiately
setImmediate(() => console.log('setImmediate')); //call stack send this to libuv after processing it libv send it to the callback queue and event loop will pick it up according to priority and give back to the call stack and it will execute immidiately 

fs.readFile("./README.md", (err, data) => { //this will also send to the libuv
    console.log('readFile');
});

setTimeout(()=>console.log('timeout1'),0);// this code will also send to the libuv
function printOut(){//fucntion will be stored in menory heap and when we call it then function call will read  this funciton from memory heap and execute the code inside the function and printout 
    console.log('printOut');
}
printOut(); // this will execute immidiately because it is in the call stack and when we call printout function then it will read the function from memory heap and execute the code inside the function and printout

console.log(a) // this will also execute immidiately because it is in the call stack and when we call console.log(a) then it will read the value of a from memory heap and print it out


//oitput will be

// printOut
// 100
// timeout1
// setImmediate
// readFile