# 📘 Node.js Learning - Day 1

This repository contains my basic learning and practice of Node.js modules.

---

##  Topics Covered

- CommonJS modules (`require`, `module.exports`)
- Importing custom modules
- Destructuring imports
- Built-in modules (`node:util`)
- Execution flow in Node.js
- Understanding how `require()` works
- Difference between function execution and variable declaration

---

## 📂 Files Overview

### 🔹 `app.js`
Main file where all modules are imported and executed.

### 🔹 `sum.js`
Exports:
- `sum(a, b)` → returns sum
- `variable` → simple variable

### 🔹 `calculate.js`
Exports:
- `multiply(a, b)`
- `subtract(a, b)`

### 🔹 `mjs.js`
Exports:
- `b` → variable
- `anyFunction()` → prints a message

Also demonstrates:
- Top-level code execution when required

### 🔹 `xyz.js`
Used to understand that:
- `require()` executes the file immediately

---

##  Key Learnings

- `require()` runs the entire file once when imported
- Top-level code executes immediately(synchronous)
- Functions run only when called
- `module.exports` is used to export multiple values
- Destructuring makes imports cleaner:
  ```js
  const { sum } = require('./sum');




  # Node.js Learning - Day 2

Today I learned about asynchronous vs synchronous code execution, the Node.js Event Loop, and how Node.js handles heavy operations using the crypto module.

---

##  Topics Covered

- Asynchronous vs Synchronous code
- Node.js Event Loop basics
- Blocking vs Non-blocking code
- libuv thread pool
- Built-in crypto module
- pbkdf2 (async) vs pbkdf2Sync (sync)

---

##  Node.js Event Loop (Basics)

The Event Loop allows Node.js to handle multiple operations efficiently using a single thread.

###  Key Idea:
- JavaScript runs on a single thread
- Async operations are handled in the background
- Event Loop decides when to execute callbacks

---

## How Event Loop Works

1. Execute all synchronous code first  
2. Send async tasks to background (libuv)  
3. When async task completes → callback goes to queue  
4. Event Loop executes callback  

---

## Example

```js
console.log("start");

crypto.pbkdf2("password", "salt", 100000, 64, "sha512", () => {
    console.log("done");
});

console.log("end");