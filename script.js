let firstNumber;
let secondNumber;
let operator;

const Operators = Object.freeze({
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "÷",
});

function operate(num1, num2, operator) {
  if (operator == Operators.ADD) {
    return num1 + num2;
  } else if (operator == Operators.SUBTRACT) {
    return num1 - num2;
  } else if (operator == Operators.MULTIPLY) {
    return num1 * num2;
  } else if (operator == Operators.DIVIDE) {
    return num1 / num2;
  }
}
