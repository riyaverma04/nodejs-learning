const multiply = (a,b)=>{
    return a*b;

}

module.exports = {multiply}; // this is how we export a function from a file to access by other files. we can access it using multiply(2,3) in app.js file. we can also use module.exports.multiply = multiply; to access the function using multiply.multiply(2,3) in app.js file.