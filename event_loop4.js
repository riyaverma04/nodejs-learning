const fs = require('fs');
const a = 100;

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
//process.nextTick will continously execute until there is no more process.nextTick in it.
process.nextTick(() =>
{
     process.nextTick(() => console.log('process.nextTick2'));
     console.log('process.nextTick');}
);
Promise.resolve().then(() => console.log('promise')); 

fs.readFile("./README.md", (err, data) => {
    // inside I/O callback

  process.nextTick(() => {
    console.log("process.nextTick inside readFile");
  });

  Promise.resolve().then(() => {
    console.log("promise inside readFile");
  });

  setImmediate(() => {
    console.log("setImmediate inside readFile");
  });

  setTimeout(() => {
    console.log("setTimeout inside readFile");
  }, 0);
    
    
   console.log("file reading");
}
);
console.log(a);


//output will be 
// 100
// process.nextTick
// process.nextTick2
// promise
// setTimeout
// setImmediate
// file reading
// process.nextTick inside readFile
// promise inside readFile
// setImmediate inside readFile
// setTimeout inside readFile