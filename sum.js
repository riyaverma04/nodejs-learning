 //module by default protecting variables and functions from gloval scope (outside file). we can export variables and functions using module to access by other files 
 
 const sum =(a,b)=>{
    return a+b;
}
const variable =console.log( "this is a variable");
// module.exports = sum; //this is how we export a funciton and variable from a file to access by other files

//module.exports.sum = sum; // this is another way to export a function and variable from a file to access by other files. we can export multiple functions and variables using this method. we can access them using sum.sum(2,3) in app.js file.

module.exports = {sum, variable}; // this is another way to export a function and variable from a file to access by other files. we can export multiple functions and variables using this method. we can access them using sum.sum(2,3) and sum.variable in app.js file.
//we can also use 
// module.exports = {
//     sum: sum,
//     variable: variable
// }
// or module.exports = {
//     sum,
//     variable
// } // this is another way to export a function and variable from a file to access by other files. we can export multiple functions and variables using this method. we can access them using sum.sum(2,3) and sum.variable in app.js file. this is called object shorthand property in javascript. we can use this method when the property name and variable name are same.






