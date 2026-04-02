const b = console.log("this file will me export in mjs")
const anyFunction = () => {
    console.log("this is any function")
}
// export default b;
module.exports.b = b; // this is how we export a variable from a file to access by other files. we can access it using b in app.js file.
module.exports.anyFunction = anyFunction;