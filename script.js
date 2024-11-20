const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const numBtns = document.querySelectorAll(".num-btn");
const symbolBtns = document.querySelectorAll(".symbol-btn");
const equalBtn = document.querySelector(".equal-btn");

const operationObject = {}

clearBtn.addEventListener("click", () => {
    num1 = 0;
    operator = "";
    num2 = 0; 
    display.textContent = ""});

let num1;
let operator;
let num2;

numBtns.forEach(
    button => button.addEventListener("click", (e) => getNumber(e)))

// Get operator from button and store number1
function getNumber(e) {
    const buttonText = e.target.innerText;
    if (!num1) {
        num1 = buttonText;
        display.textContent = num1;
    } else if (!operator) {
        display.textContent += buttonText;
        num1 += `${buttonText}`;
    } else if (!num2) {
        num2 = buttonText;
        display.textContent += num2;
    } else {
        display.textContent += buttonText;
        num2 += buttonText;
        console.log(num2);
    }
}

symbolBtns.forEach(
    button => button.addEventListener("click", () => {
        if (num2) {
            onEqlBtnClick();
        }
        const operatorSpan = document.createElement("span");
        operatorSpan.textContent = ` ${button.textContent} `;
        display.appendChild(operatorSpan);
        operator = operatorSpan.innerText.trim();
    }
))

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Cannot divide by zero";
    }
    return num1 / num2;
}

function operate(num1, num2, operator) {
    let result
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = divide(num1, num2);
            break;
    }
    return result;
}

const onEqlBtnClick = function() {
    if (num2 === undefined) {
        return;
    }
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    num1 = operate(num1, num2, operator);
    display.textContent = Math.round(num1 * 100000) / 100000;
    num2 = "";
    operator = "";
}

equalBtn.addEventListener("click", onEqlBtnClick)

