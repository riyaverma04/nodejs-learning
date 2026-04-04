const fs = require('fs');
const a = 100;
fs.readFile("./README.md", (err, data) => {
    console.log("file reading");
}
);
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('process.nextTick'));
Promise.resolve().then(() => console.log('promise'));   
console.log(a);




//inside eventloop there is another loop which is called microtask queue and in microtask queue there are two types of tasks one is process.nextTick and another is promise and these two types of tasks will be executed before any other task in the callback queue and event loop will pick it up according to priority and give back to the call stack and it will execute immidiately
 //priority of execution is process.nextTick > promise > timer process.nextTick > promise > > poll(file)process.nextTick > promise  > check(setImmediate)>close 



///out put will be 

// 100
// "last line of the file"
// ''process.nextTick
// //promise
// setTimeout
// setImmediate
// file reading