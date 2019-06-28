// TO DO:
// - align numbers to the right on display
// - display entire mathematical expression on screen at once? or not?
// - eventually: handle more than two numbers?
// - eventually: convert to OOP structure

const display = document.getElementById("display");
const buttons = document.getElementsByClassName("button");
const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const button7 = document.getElementById("button7");
const button8 = document.getElementById("button8");
const button9 = document.getElementById("button9");
const buttonAdd = document.getElementById("buttonAdd");
const buttonSubtract = document.getElementById("buttonSubtract");
const buttonMultiply = document.getElementById("buttonMultiply");
const buttonDivide = document.getElementById("buttonDivide");
const buttonClear = document.getElementById("buttonClear");
const buttonEquals = document.getElementById("buttonEquals");

// var to hold current number
let numDisplayed = "";
// array to hold entire sequence of buttons
let instructions = [];

// main function
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let buttonClicked = event.srcElement.innerText;
		if (buttonClicked === "C") {
			handleClear();
		} else {
			handleMath(buttonClicked);
		}
	});
}

function isOperator(btn) {
	return btn === "+" || btn === "-" || btn === "*" || btn === "/";
}

function handleMath(btn) {
	// if number was entered, add it to display & number var
	if (Number(btn) == btn) {
		numDisplayed += btn;
		console.log("numDisplayed is now: " + numDisplayed);
		display.innerHTML = numDisplayed;
	// if non-number was entered...
	} else {
		if (numDisplayed !== "") {
      	  // save current number to array
      	  console.log("Saving this number to array: " + numDisplayed);
		  instructions.push(numDisplayed);
    	}
		console.log("instructions is now: " + instructions);
		// add non-number to display
		display.innerHTML = numDisplayed + btn;
		// reset number var to empty
		numDisplayed = "";
		// add non-number to array
		console.log("Last item added to array was: " + instructions[instructions.length-1]);
		if (isOperator(instructions[instructions.length-1])) {
			console.log("Whoops, the previous button pressed was also an operator!");
			instructions[instructions.length-1] = btn;
		} else {
			console.log("Pushing operator!");
			instructions.push(btn);
		}
		// if it was equals, run the equals function
		if (instructions[instructions.length-1] === "=") {
			handleEquals(instructions);
		}
	}
}

function handleClear() {
	instructions = [];
	numDisplayed = "";
	display.innerHTML = 0;
}

function addNums(a, b) {
	return a + b;
}

function subtractNums(a, b) {
	return a - b;
}

function multiplyNums(a, b) {
	return a * b;
}

function divideNums(a, b) {
	return a / b;
}

function handleEquals(arr) {
	let num1 = Number(arr[0]);
	let operation = arr[1];
	let num2 = Number(arr[2]);
	let result = 0;
	if (operation === "+") {
		result = addNums(num1, num2);
	}
	if (operation === "-") {
		result = subtractNums(num1, num2);
	}
	if (operation === "*") {
		result = multiplyNums(num1, num2);
	}
	if (operation === "/") {
		result = divideNums(num1, num2);
	}
	display.innerHTML = result;
	instructions = [];
}