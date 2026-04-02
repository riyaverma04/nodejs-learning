//this is index.js file in calculate folder. we will export all the functions from this file to access by other files. we can also export the functions directly from their respective files but this is a better way to manage the code and keep it organized. now this folder will work as module


const { multiply } = require("./multiply");

const {subtract} = require("./subtract");

module.exports = {multiply, subtract};