// TO DO:
// - handle error: "+ 5 ="
// - align numbers to the right on display
// - display entire mathematical expression on screen at once? or not?
// - eventually: handle more than two numbers?

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
			console.log("numDisplayed is now: " + this.numDisplayed);
			this.display.innerHTML = this.numDisplayed;
		// if non-number was entered...
		} else {
			if (this.numDisplayed !== "") {
	      	  // save current number to array
	      	  console.log("Saving this number to array: " + this.numDisplayed);
			  this.instructions.push(this.numDisplayed);
	    	}
			console.log("instructions is now: " + this.instructions);
			// add non-number to display
			this.display.innerHTML = this.numDisplayed + btn;
			// reset number var to empty
			this.numDisplayed = "";
			// add non-number to array
			console.log("Last item added to array was: " + this.instructions[this.instructions.length-1]);
			if (this.isOperator(this.instructions[this.instructions.length-1])) {
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
		this.instructions = [];
	} // end of handleEquals

}; // end of calculator object

calculator.main();

////////////////////////////////////////////