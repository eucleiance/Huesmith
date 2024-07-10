/* eslint-disable */
// Single-line comment

/*
  Multi-line comment
*/

// Constants and Variables
const CONSTANT_VALUE = 42;
let mutableValue = "Hello, World!";
var anotherValue = true;

// Primitive Types
let number = 123;
let string = "This is a string";
let boolean = false;
let nullValue = null;
let undefinedValue;
let symbol = Symbol("symbol");

// Functions
function add(a, b) {
  return a + b;
}

const subtract = (a, b) => {
  return a - b;
};

function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

(async function asyncFunction() {
  const result = await new Promise((resolve) => setTimeout(() => resolve("Done"), 1000));
  console.log(result);
})();

// Objects and Arrays
let person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

let colors = ["red", "green", "blue"];
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Classes and Inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let dog = new Dog("Rex", "Golden Retriever");
dog.speak();

// Control Structures
if (number > 100) {
  console.log("Number is greater than 100");
} else if (number < 100) {
  console.log("Number is less than 100");
} else {
  console.log("Number is 100");
}

switch (mutableValue) {
  case "Hello":
    console.log("Greeting detected");
    break;
  case "World":
    console.log("World detected");
    break;
  default:
    console.log("No match found");
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

for (let color of colors) {
  console.log(color);
}

colors.forEach((color, index) => {
  console.log(`Color at index ${index} is ${color}`);
});

try {
  throw new Error("An error occurred");
} catch (error) {
  console.error(error);
} finally {
  console.log("Finally block executed");
}

// Modules (ES6)
import { ModuleA } from './moduleA.js';
export const ModuleB = () => {
  console.log("Module B");
};

// Promises
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise resolved"), 2000);
});

promise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

// Regular Expressions
let regex = /\d+/g;
let regexTest = regex.test("123");
let regexMatch = "123abc".match(regex);

console.log(regexTest);  // true
console.log(regexMatch); // ["123"]

// Destructuring
let [firstColor, secondColor, thirdColor] = colors;
let { name, age } = person;

console.log(firstColor, secondColor, thirdColor);
console.log(name, age);

// Spread and Rest Operators
let spreadArray = [...colors, "yellow", "purple"];
let [first, ...rest] = spreadArray;

console.log(spreadArray);
console.log(first, rest);

// Template Literals
let greeting = `Hello, ${name}! You are ${age} years old.`;

console.log(greeting);
