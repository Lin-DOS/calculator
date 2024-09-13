var operator = "";
var firstOperand = "";
var secondOperand = "";
var output = 0;
var butSelect = document.getElementById("decimalButton");
var input = document.querySelector(".input");
var answer = document.querySelector("#answer");
var equalsButton = document.querySelector("#equals");
var allclearButton = document.querySelector("#ac");
var decimalButton = document.querySelector("#decimal");
var negativeButton = document.querySelector("#negative");
var button = document.querySelectorAll("button");
var numbers = document.querySelectorAll(".number");
var operatorButton = document.querySelectorAll(".operator");
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    try {
        if (y === 0) {
            throw new Error("Dividing by zero is not permitted.");
        }
    }
    catch (err) {
        answer.innerHTML = "".concat(err.message);
    }
    finally {
        return y > 0 ? x / y : 0;
    }
}
function getRemainder(x, y) {
    return x % y;
}
function operate(o, x, y) {
    if (y === void 0) { y = 0; }
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
            output = add(x, y);
            break;
    }
    firstOperand = output.toString();
    secondOperand = "";
    operator = "";
    inputDisplay("", output);
}
document.querySelector("#backspace").addEventListener("click", function () { return backspace(); });
function backspace() {
    var textLength = input.textContent.length - 1;
    input.textContent = input.textContent.substring(0, textLength);
}
function inputDisplay(x, ans) {
    if (ans === void 0) { ans = output; }
    // Handles operators when there are no operands.
    if (operator !== "" && firstOperand === "") {
        backspace();
    }
    console.log(x);
    input.textContent += "".concat(x);
    answer.textContent = "Ans = ".concat(ans);
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
operatorButton.forEach(function (button) {
    button.addEventListener("click", function () {
        operator = button.textContent;
        // butSelect.disabled = false; 
    });
});
numbers.forEach(function (button) {
    button.addEventListener("click", function () {
        if (firstOperand !== "" && operator === "") {
            firstOperand += button.textContent;
            console.log("first " + firstOperand);
        }
        if (firstOperand === "") {
            firstOperand = button.textContent;
            console.log("first " + firstOperand);
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
    });
});
equalsButton === null || equalsButton === void 0 ? void 0 : equalsButton.addEventListener("click", function () {
    if (firstOperand !== "" && secondOperand === "") {
        operate("=", parseFloat(firstOperand));
    }
    answer.textContent = input.textContent;
    input.textContent = "".concat(output);
});
decimalButton.addEventListener("click", function () {
    if (firstOperand.indexOf(".") !== -1 && operator === "") {
        butSelect.disabled = true;
    }
    if (operator !== "" && secondOperand !== "") {
        butSelect.disabled = false;
    }
    if (firstOperand.indexOf(".") === -1 || secondOperand.indexOf(".") === -1) {
        // if (secondOperand !== "") {
        //   secondOperand += ".";
        // }   
        if (secondOperand !== "" && operator !== "") {
            secondOperand += ".";
            butSelect.disabled = true;
        }
        if (secondOperand === "" && operator !== "")
            secondOperand += ".";
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
button.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.id !== "equals" && button.id !== "backspace" && button.className !== "copy" && button.id != "decimal") {
            if (button.id === "negative" && firstOperand !== "") {
                operator = "-";
            }
            if (button.id === "negative" && firstOperand === "") {
                firstOperand = "-";
            }
            if (input.textContent === "" && button.className === "operator") {
                inputDisplay(button.textContent);
                backspace();
            }
            else
                inputDisplay(button.textContent);
        }
    });
});
var clear = allclearButton.addEventListener("click", function () {
    input.textContent = "";
    answer.textContent = input.textContent;
    output = 0;
    firstOperand = "";
    secondOperand = "";
    operator = "";
});
document.querySelector(".copy").addEventListener("click", function () {
    navigator.clipboard.writeText(input.textContent);
    document.querySelector(".copy").textContent = "Copied";
});
