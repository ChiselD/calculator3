// TO DO:
// align numbers to the right on display
// display entire mathematical expression on screen at once? or not?
// eventually: handle more than two numbers?

const calculator = {

	display: document.getElementById("display"),
	buttons: document.getElementsByClassName("button"),
	button0: document.getElementById("button0"),
	button1: document.getElementById("button1"),
	button2: document.getElementById("button2"),
	button3: document.getElementById("button3"),
	button4: document.getElementById("button4"),
	button5: document.getElementById("button5"),
	button6: document.getElementById("button6"),
	button7: document.getElementById("button7"),
	button8: document.getElementById("button8"),
	button9: document.getElementById("button9"),
	buttonAdd: document.getElementById("buttonAdd"),
	buttonSubtract: document.getElementById("buttonSubtract"),
	buttonMultiply: document.getElementById("buttonMultiply"),
	buttonDivide: document.getElementById("buttonDivide"),
	buttonClear: document.getElementById("buttonClear"),
	buttonEquals: document.getElementById("buttonEquals"),
	numDisplayed: "",
	instructions: [],

	main: function() {
		for (let i = 0; i < calculator.buttons.length; i++) {
			calculator.buttons[i].addEventListener("click", function() {
				let buttonClicked = event.srcElement.innerText;
				if (buttonClicked === "C") {
					calculator.handleClear();
				} else {
					calculator.handleMath(buttonClicked);
				}
			});
		}
	}, // end of main

	isOperator: function(btn) {
		return btn === "+" || btn === "-" || btn === "*" || btn === "/";
	}, // end of isOperator

	handleMath: function(btn) {
		// if number was entered, add it to display & number var
		if (Number(btn) == btn) {
			this.numDisplayed += btn;
			// console.log("numDisplayed is now: " + this.numDisplayed);
			this.display.innerHTML = this.numDisplayed;
		// if non-number was entered...
		} else {
			if (this.numDisplayed !== "") {
	      	  // save current number to instructions array
	      	  // console.log("Saving this number to instructions array: " + this.numDisplayed);
			  this.instructions.push(this.numDisplayed);
	    	}
			console.log("this.instructions is now: " + this.instructions);
			// add non-number to display
			this.display.innerHTML = this.numDisplayed + btn;
			// reset number var to empty
			this.numDisplayed = "";
			// add non-number to array
			// console.log("Last item added to instructions was: " + this.instructions[this.instructions.length-1]);
			if (this.isOperator(this.instructions[this.instructions.length-1])) {
				// If two operators are entered in a row, overwrite the first one with the second one
				console.log("Whoops, the previous button pressed was also an operator!");
				this.instructions[this.instructions.length-1] = btn;
			} else {
				console.log("Pushing operator!");
				this.instructions.push(btn);
			}
			// if it was equals, run the equals function
			if (this.instructions[this.instructions.length-1] === "=") {
				this.handleEquals(this.instructions);
			}
		}
	}, // end of handleMath

	checkForMultipleNumbers: function(arr) {
		// If there are multiple numbers in the instructions array, this function returns "mult"
		// If there is only one number in the instructions array, this function returns that number
		let howManyNumbers = 0;
		let onlyNumber = 0;
		for (let i = 0; i < arr.length; i++) {
			if (Number(arr[i]) == arr[i]) {
				onlyNumber = arr[i];
				howManyNumbers++;
			}
			if (howManyNumbers >= 2) {
				return "mult";
			}
		}
		return onlyNumber;
	}, // end of checkForMultipleNumbers

	handleClear: function() {
		this.instructions = [];
		this.numDisplayed = "";
		this.display.innerHTML = 0;
	}, // end of handleClear

	addNums: function(a, b) {
		return a + b;
	}, // end of addNums

	subtractNums: function(a, b) {
		return a - b;
	}, // end of subtractNums

	multiplyNums: function(a, b) {
		return a * b;
	}, // end of multiplyNums

	divideNums: function(a, b) {
		return a / b;
	}, // end of divideNums

	handleEquals: function(arr) {
		// If the instructions array contains multiple numbers, calculate result normally...
		if (this.checkForMultipleNumbers(this.instructions) === "mult") {
			let num1 = Number(arr[0]);
			let operation = arr[1];
			let num2 = Number(arr[2]);
			let result = 0;
			if (operation === "+") {
				result = this.addNums(num1, num2);
			}
			if (operation === "-") {
				result = this.subtractNums(num1, num2);
			}
			if (operation === "*") {
				result = this.multiplyNums(num1, num2);
			}
			if (operation === "/") {
				result = this.divideNums(num1, num2);
			}
			this.display.innerHTML = result;
		// ...Otherwise, display only the single number that was entered
		} else {
			this.display.innerHTML = this.checkForMultipleNumbers(this.instructions);
		}
		// In either case, reset the instructions array to empty when done
		this.instructions = [];
	} // end of handleEquals

}; // end of calculator object

calculator.main();

////////////////////////////////////////////