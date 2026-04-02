# 📘 Node.js Learning - Day 1

This repository contains my basic learning and practice of Node.js modules.

---

## 🚀 Topics Covered

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

## 🧠 Key Learnings

- `require()` runs the entire file once when imported
- Top-level code executes immediately
- Functions run only when called
- `module.exports` is used to export multiple values
- Destructuring makes imports cleaner:
  ```js
  const { sum } = require('./sum');