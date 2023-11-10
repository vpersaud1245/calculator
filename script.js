let firstNumber;
let secondNumber;
let operator;
const numberButtons = document.querySelectorAll(".numberButton");
const upperDisplay = document.querySelector(".upperDisplay");
const lowerDisplay = document.querySelector(".lowerDisplay");
const operatorButtons = document.querySelectorAll(".operatorButton");
const allClearButton = document.querySelector("#AC");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");
const deleteButton = document.querySelector("#Delete");
const body = document.querySelector("body");
const buttons = document.querySelectorAll("button");

function operate(num1, num2, operator) {
  if (operator == "+") {
    return num1 + num2;
  } else if (operator == "-") {
    return num1 - num2;
  } else if (operator == "x" || operator == "*") {
    return num1 * num2;
  } else if (operator == "÷" || operator == "/") {
    if (num2 == 0) {
      return "Error";
    } else {
      return num1 / num2;
    }
  } else if (operator == "%") {
    return num1 % num2;
  }
}

function displayNumber(e) {
  let numberToDisplay;
  if (e instanceof KeyboardEvent) {
    numberToDisplay = e.key;
  } else if (e instanceof PointerEvent) {
    let numberButtonValue = e.target.innerHTML;
    numberToDisplay = numberButtonValue;
  }
  if (lowerDisplay.textContent.length < 12) {
    lowerDisplay.textContent += numberToDisplay;
  }
}

function handleOperatorInput(e) {
  let selectedOperator;
  if (e instanceof KeyboardEvent) {
    selectedOperator = e.key;
  } else if (e instanceof PointerEvent) {
    let operatorButtonValue = e.target.innerHTML;
    selectedOperator = operatorButtonValue;
  }
  if (
    lowerDisplay.textContent != "" &&
    (operator === undefined || operator == "")
  ) {
    firstNumber = parseFloat(lowerDisplay.textContent);
    operator = selectedOperator;
    upperDisplay.textContent = `${lowerDisplay.textContent} ${operator}`;
    lowerDisplay.textContent = "";
  } else if (
    !(operator === undefined || operator == "") &&
    lowerDisplay.textContent != ""
  ) {
    firstNumber = parseFloat(upperDisplay.textContent.slice(0, -1));
    secondNumber = parseFloat(lowerDisplay.textContent);
    let result = operate(firstNumber, secondNumber, operator);
    operator = selectedOperator;
    lowerDisplay.textContent = "";
    upperDisplay.textContent = `${result} ${operator}`;
  }
}

function clearDisplays() {
  upperDisplay.textContent = "";
  lowerDisplay.textContent = "";
}

function resetNumberAndOperatorVariables() {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
}

function equalButtonAction(e) {
  firstNumber = parseFloat(upperDisplay.textContent);
  secondNumber = parseFloat(lowerDisplay.textContent);
  clearDisplays();
  lowerDisplay.textContent = operate(firstNumber, secondNumber, operator);
  resetNumberAndOperatorVariables();
}

function decimalButtonAction(e) {
  if (!lowerDisplay.textContent.includes(".")) {
    lowerDisplay.textContent = `${lowerDisplay.textContent}.`;
  }
}

function deleteButtonAction() {
  if (lowerDisplay.textContent == "") {
    lowerDisplay.textContent = upperDisplay.textContent.slice(0, -1);
    upperDisplay.textContent = "";
    operator = "";
  } else if (lowerDisplay.textContent != "") {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
  }
}

function blurButtons() {
  buttons.forEach((button) => {
    button.blur();
  });
}

numberButtons.forEach((button) => {
  button.addEventListener("click", displayNumber);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorInput);
});

allClearButton.addEventListener("click", (e) => {
  resetNumberAndOperatorVariables();
  clearDisplays();
});

equalsButton.addEventListener("click", equalButtonAction);

decimalButton.addEventListener("click", decimalButtonAction);

deleteButton.addEventListener("click", deleteButtonAction);

body.addEventListener("keydown", (e) => {
  let keyPressed = e.key;
  console.log(keyPressed);

  if (keyPressed.match(/[0-9]/)) {
    blurButtons();
    displayNumber(e);
  }

  if (keyPressed == "Enter") {
    blurButtons();
    equalButtonAction(e);
  }
  if (keyPressed == "Backspace") {
    blurButtons();
    deleteButtonAction();
  }
  if (keyPressed == ".") {
    decimalButtonAction();
  }
  if (["*", "-", "+", "/", "%"].includes(keyPressed)) {
    blurButtons();
    handleOperatorInput(e);
  }
});
