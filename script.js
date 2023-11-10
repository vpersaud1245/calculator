let firstNumber;
let secondNumber;
let operator;

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

const numberButtons = document.querySelectorAll(".numberButton");
const upperDisplay = document.querySelector(".upperDisplay");
let upperDisplayContent = document.querySelector(".upperDisplay").innerHTML;
const lowerDisplay = document.querySelector(".lowerDisplay");
let lowerDisplayContent = document.querySelector(".lowerDisplay").innerHTML;
const operatorButtons = document.querySelectorAll(".operatorButton");

for (button of numberButtons) {
  button.addEventListener("click", (e) => {
    if (lowerDisplay.textContent.length < 12) {
      lowerDisplay.textContent += e.target.innerHTML;
    }
  });
}

for (button of operatorButtons) {
  button.addEventListener("click", (e) => {
    console.log(operator);
    if (
      lowerDisplay.textContent != "" &&
      (operator === undefined || operator == "")
    ) {
      firstNumber = parseFloat(lowerDisplay.textContent);
      operator = e.target.textContent;
      upperDisplay.textContent = `${lowerDisplay.textContent} ${operator}`;
      lowerDisplay.textContent = "";
    } else if (
      !(operator === undefined || operator == "") &&
      lowerDisplay.textContent != ""
    ) {
      firstNumber = parseFloat(upperDisplay.textContent.slice(0, -1));
      secondNumber = parseFloat(lowerDisplay.textContent);
      let result = operate(firstNumber, secondNumber, operator);
      operator = e.target.innerHTML;
      lowerDisplay.textContent = "";
      upperDisplay.textContent = `${result} ${operator}`;
    }
  });
}

const allClearButton = document.querySelector("#AC");

allClearButton.addEventListener("click", (e) => {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  upperDisplay.textContent = "";
  lowerDisplay.textContent = "";
});

const equalsButton = document.querySelector("#equals");
function equalButtonAction(e) {
  firstNumber = parseFloat(upperDisplay.textContent);
  secondNumber = parseFloat(lowerDisplay.textContent);
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
  lowerDisplay.textContent = operate(firstNumber, secondNumber, operator);
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
}
equalsButton.addEventListener("click", equalButtonAction);

const decimalButton = document.querySelector("#decimal");
function decimalButtonAction(e) {
  if (!lowerDisplay.textContent.includes(".")) {
    lowerDisplay.textContent = `${lowerDisplay.textContent}.`;
  }
}
decimalButton.addEventListener("click", decimalButtonAction);

const deleteButton = document.querySelector("#Delete");
function deleteButtonAction() {
  if (lowerDisplay.textContent == "") {
    lowerDisplay.textContent = upperDisplay.textContent.slice(0, -1);
    upperDisplay.textContent = "";
    operator = "";
  } else if (lowerDisplay.textContent != "") {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
  }
}
deleteButton.addEventListener("click", deleteButtonAction);

const body = document.querySelector("body");
const buttons = document.querySelectorAll("button");
function blurButtons() {
  buttons.forEach((button) => {
    button.blur();
  });
}

body.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key.match(/[0-9]/)) {
    blurButtons();
    if (lowerDisplay.textContent.length < 12) {
      lowerDisplay.textContent += e.key;
    }
  }
  if (e.key == "Enter") {
    blurButtons();
    equalButtonAction(e);
  }
  if (e.key == "Backspace") {
    blurButtons();
    deleteButtonAction();
  }
  if (e.key == ".") {
    decimalButtonAction();
  }
  if (
    e.key == "*" ||
    e.key == "-" ||
    e.key == "+" ||
    e.key == "/" ||
    e.key == "%"
  ) {
    blurButtons();
    if (
      lowerDisplay.textContent != "" &&
      (operator === undefined || operator == "")
    ) {
      firstNumber = parseFloat(lowerDisplay.textContent);
      operator = e.key;
      upperDisplay.textContent = `${lowerDisplay.textContent} ${operator}`;
      lowerDisplay.textContent = "";
    } else if (
      !(operator === undefined || operator == "") &&
      lowerDisplay.textContent != ""
    ) {
      firstNumber = parseFloat(upperDisplay.textContent.slice(0, -1));
      secondNumber = parseFloat(lowerDisplay.textContent);
      let result = operate(firstNumber, secondNumber, operator);
      operator = e.key;
      lowerDisplay.textContent = "";
      upperDisplay.textContent = `${result} ${operator}`;
    }
  }
});
