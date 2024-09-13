let operator: string = "";
let firstOperand: string = "";
let secondOperand: string = "";
let output: number = 0;
const butSelect = document.getElementById("decimalButton") as HTMLSelectElement;
const input = document.querySelector(".input");
const answer = document.querySelector("#answer");
const equalsButton = document.querySelector("#equals");
const allclearButton = document.querySelector("#ac");
const decimalButton = document.querySelector("#decimal") as HTMLElement;
const negativeButton = document.querySelector("#negative");
const button = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");

function add(x: number, y: number) {
  return x + y;
}

function subtract(x: number, y: number) {
  return x - y;
}

function multiply(x: number, y: number) {
  return x * y;
}

function divide(x: number, y: number) {
  try {
    if (y === 0) {
      throw new Error("Dividing by zero is not permitted.");
    } 
  } catch (err) {
    answer.innerHTML = `${err.message}`;
  }
  finally {
    return y > 0 ? x / y : 0;
  }
}

function getRemainder(x: number, y: number) {
  return x % y;
}

function operate(o: string, x: number, y: number = 0) {
  switch (o) {
    case '+':
      output = add(x, y);
      break;
    case '-':
      output = subtract(x, y);
      break;
    case '*':
      output = multiply(x, y);
      break;
    case '÷':
      output = divide(x, y);
      break;
    case '%':
      output = getRemainder(x, y);
      break;
    case '=':
      output = add(x,y);
      break;
  }
  firstOperand = output.toString();
  secondOperand = "";
  operator = "";
  inputDisplay("", output);
}
document.querySelector("#backspace").addEventListener("click", () => backspace());

function backspace() {
  let textLength = input.textContent.length - 1;
  input.textContent = input.textContent.substring(0, textLength);
}

function inputDisplay(x: string | number, ans: number = output) {
  // Handles operators when there are no operands.
  if (operator !== "" && firstOperand === "") {
    backspace();
  }
  console.log(x);

  input.textContent += `${x}`;
  answer.textContent = `Ans = ${ans}`;

    // Handles leading zeroes
    if (firstOperand.indexOf("0") === 0 && firstOperand.length > 0
    && firstOperand.indexOf(".") === -1) {
  firstOperand = firstOperand.substring(1);
  input.textContent = input.textContent.substring(1);
}
if (secondOperand.indexOf("0") === 0 && secondOperand.length > 0
&& secondOperand.indexOf(".") === -1) {
  secondOperand = secondOperand.substring(1);
  input.textContent = input.textContent.substring(1);
}
}

operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.textContent;
    // butSelect.disabled = false; 
  });
});

numbers.forEach((button) => {  
  button.addEventListener("click", () => {
    if (firstOperand !== "" && operator === "") {
      firstOperand += button.textContent;
      console.log("first " + firstOperand)
    }
    if (firstOperand === "") {
      firstOperand = button.textContent;
      console.log("first " + firstOperand)
    }

    if (secondOperand !== "" && operator !== "") {
      secondOperand += button.textContent;
      console.log("second " + secondOperand);
    }

    if (secondOperand === "" && operator !== "") {
      secondOperand += button.textContent;
      console.log("second " + secondOperand);
    }

    if (firstOperand !== "" && secondOperand !== "") {
      operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
    }
  }
)});

equalsButton?.addEventListener("click", () => {
  if (firstOperand !== "" && secondOperand === "") {
    operate("=", parseFloat(firstOperand));
  }
  answer.textContent = input.textContent;
  input.textContent = `${output}`;  
});

// Fix decimal points when a second operand is assigned a value and during operation
decimalButton.addEventListener("click", () => {
  if (firstOperand.indexOf(".") !== -1 && operator === "") {
    butSelect.disabled = true; 
  } 

  if (operator !== "" && secondOperand !== "") {
    butSelect.disabled = false; 
  } 

  if (firstOperand.indexOf(".") === -1 || secondOperand.indexOf(".") === -1) {

  if (secondOperand !== "" && operator !== "") {
    secondOperand += ".";
    butSelect.disabled = true; 
  }

  if (secondOperand === "" && operator !== "") secondOperand += ".";

  if (secondOperand === "" && operator !== "") {
    secondOperand += ".";
    input.textContent += ".";
  }

  if (secondOperand === "" && operator === "") {
    console.log("6. adding decimal");
    firstOperand += ".";
    input.textContent += ".";
  }
  }
});

button.forEach((button) => {  
  button.addEventListener("click", () => {
    if (button.id !== "equals" && button.id !== "backspace" && button.className !== "copy" && button.id != "decimal") {
      if (button.id === "negative" && firstOperand !== "") {
          operator = "-";
      }
      if (button.id === "negative" && firstOperand === "") {
        firstOperand = "-"
      }
      if (input.textContent === "" && button.className === "operator") {
        inputDisplay(button.textContent);
        backspace();
      }
      else inputDisplay(button.textContent);
    }
});
});

const clear = allclearButton.addEventListener("click", () => {
  input.textContent = ""; 
  answer.textContent = input.textContent;
  output = 0;
  firstOperand = "";
  secondOperand = "";
  operator = "";
});

document.querySelector(".copy").addEventListener("click", () => {
  navigator.clipboard.writeText(input.textContent);
  document.querySelector(".copy").textContent = "Copied";
});