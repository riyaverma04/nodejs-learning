const fs = require('fs');
const a = 100;

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('process.nextTick'));
Promise.resolve().then(() => console.log('promise')); 

fs.readFile("./README.md", (err, data) => {
    Promise.resolve().then(() => console.log('promise2')); 
    setTimeout(() => console.log('setTimeout2'), 0);
    console.log("file reading");
    
    process.nextTick(() => console.log('process.nextTick2'));
    setImmediate(() => console.log('setImmediate2'));
}
);
console.log(a);




//output will be 
// 100
// process.nextTick
// promise
// setTimeout
// setImmediate
// file reading
// process.nextTick2
// promise2
// setImmediate2
// setTimeout2