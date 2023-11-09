let firstNumber;
let secondNumber;
let operator;

function operate(num1, num2, operator) {
  if (operator == "+") {
    return num1 + num2;
  } else if (operator == "-") {
    return num1 - num2;
  } else if (operator == "x") {
    return num1 * num2;
  } else if (operator == "÷") {
    if (num2 == 0) {
      return "Error";
    } else {
      return num1 / num2;
    }
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
    lowerDisplay.textContent += e.target.innerHTML;
  });
}

for (button of operatorButtons) {
  button.addEventListener("click", (e) => {
    firstNumber = parseFloat(lowerDisplay.textContent);
    if (!isNaN(firstNumber)) {
      operator = e.target.textContent;
      console.log(operator);
      upperDisplay.textContent = `${lowerDisplay.textContent} ${operator}`;
      lowerDisplay.textContent = "";
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

equalsButton.addEventListener("click", (e) => {
  secondNumber = parseFloat(lowerDisplay.textContent);
  console.log(secondNumber);
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
  lowerDisplay.textContent = operate(firstNumber, secondNumber, operator);
});

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", (e) => {
  if (!lowerDisplay.textContent.includes(".")) {
    lowerDisplay.textContent = `${lowerDisplay.textContent}.`;
  }
});
// Add delete function
// Add percent function
// Add keyboard input function
