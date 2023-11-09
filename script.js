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
    lowerDisplay.textContent += e.target.innerHTML;
  });
}

for (button of operatorButtons) {
  button.addEventListener("click", (e) => {
    console.log(`first number is ${firstNumber}`);
    console.log(`second number is ${secondNumber}`);
    console.log(`operator is ${operator}`);
    if (
      lowerDisplay.textContent != "" &&
      (operator === undefined || operator == "")
    ) {
      firstNumber = parseFloat(lowerDisplay.textContent);
      operator = e.target.textContent;
      upperDisplay.textContent = `${lowerDisplay.textContent} ${operator}`;
      lowerDisplay.textContent = "";
    } else if (!(operator === undefined || operator == "")) {
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

equalsButton.addEventListener("click", (e) => {
  firstNumber = parseFloat(upperDisplay.textContent);
  secondNumber = parseFloat(lowerDisplay.textContent);
  console.log(firstNumber);
  console.log(typeof firstNumber);
  console.log(secondNumber);
  console.log(typeof secondNumber);
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
  lowerDisplay.textContent = operate(firstNumber, secondNumber, operator);
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
});

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", (e) => {
  if (!lowerDisplay.textContent.includes(".")) {
    lowerDisplay.textContent = `${lowerDisplay.textContent}.`;
  }
});

const deleteButton = document.querySelector("#Delete");

deleteButton.addEventListener("click", (e) => {
  if (lowerDisplay.textContent == "") {
    lowerDisplay.textContent = upperDisplay.textContent.slice(0, -1);
    upperDisplay.textContent = "";
    operator = "";
  } else if (lowerDisplay.textContent != "") {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
  }
});
