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




# 📘 Node.js Learning - Day 3

Today I learned about the core internals of Node.js, including how the V8 engine works, how libuv handles asynchronous operations, and how the Event Loop manages execution.

---

## 🚀 Topics Covered

- V8 Engine basics
- How JavaScript executes in Node.js
- libuv and thread pool
- Event Loop working
- Microtasks vs Macrotasks
- Async vs Sync execution flow
- setTimeout vs setImmediate
- process.nextTick priority

---

## 🧠 V8 Engine

V8 is the JavaScript engine used by Node.js.

### 🔑 Key Points:
- Converts JavaScript code into machine code
- Executes synchronous JavaScript
- Handles call stack and memory management

---

## ⚙️ How V8 Works

1. JavaScript code is parsed -> parsing contains lexical analysis "tokenization" and syntax analysis " parsing" visit : https://astexplorer.net/  to know how abstract syntax tree looks like.  
2. Converted into machine code  
3. Executed using call stack  

👉 V8 only handles **synchronous code execution**

v8 js engine documentation :- https://v8.dev/

---

## 🔄 libuv (Async Engine)

libuv is responsible for handling asynchronous operations in Node.js.

### 🔑 Responsibilities:
- File system operations
- Network requests
- Timers
- Thread pool management

👉 It runs heavy tasks in the background

---

## 🧵 Thread Pool

- Used by libuv for heavy operations
- Default size: 4 threads
- Handles tasks like:
  - crypto
  - file system
  - DNS

---

## 🔁 Event Loop

The Event Loop is responsible for executing callbacks and managing async operations.

### 🔑 Key Idea:
- Node.js is single-threaded
- Event Loop makes it non-blocking

---

## 🔄 Event Loop Phases (Basic)

1. Timers → setTimeout, setInterval  
2. I/O Callbacks → file system, network  
3. Check → setImmediate  
4. Close callbacks  

---

## ⚡ Execution Priority

### 🥇 Highest Priority
- process.nextTick()

### 🥈 Microtasks
- Promise callbacks

### 🥉 Macrotasks
- setTimeout
- setImmediate
- I/O callbacks

---

## 📊 Example Execution Order

```js
console.log(100);

process.nextTick(() => console.log("process.nextTick"));

Promise.resolve().then(() => console.log("promise"));

setTimeout(() => console.log("setTimeout"), 0);

setImmediate(() => console.log("setImmediate"));