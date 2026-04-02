require('./xyz');
const util = require("node: util"); // this is how we import a built-in module in node.js. we can use the functions and variables of the util module using util.functionName in app.js file. we can also use const {functionName} = require('util'); to access the function directly in app.js file.



const {multiply, subtract } = require('./calculate')
// import b from './mjs.js';
//const sum = require('./sum');// without destructuring
const {sum,variable} = require('./sum'); //with destructuring. we can access the function and variable using sum.sum(2,3) and sum.variable in app.js file. we can also use const {sum, variable} = require('./sum'); to access both function and variable in app.js file.
const {b, anyFunction} = require('./mjs'); //with destructuring. we can access the variable and function using b and anyFunction in app.js file. we can also use const {b, anyFunction} = require('./mjs'); to access both variable and function in app.js file.
// console.log(sum.sum(2,3));
console.log(sum(2,3));//access when destructured
 console.log(variable);
variable;
// b;
b;
anyFunction();
console.log(multiply(2,3));
console.log(subtract(5,2));

// let a = "riya verma";
// console.log(a);
// console.log(global)
// console.log(globalThis);
// console.log(global === globalThis) // true