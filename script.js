const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const numBtns = document.querySelectorAll(".num-btn");
const operateBtns = document.querySelectorAll(".operate-btn");
const equalBtn = document.querySelector(".equal-btn");
const decimalBtn = document.querySelector(".decimal-btn")
const squareBtn = document.querySelector(".square-btn")
const sqrtBtn = document.querySelector(".sqrt-btn")

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
    }
}

function onDecimalClick(e){
    const buttonText = e.target.innerText;
    if (!operator && !num1) {
        num1 = buttonText;
        display.textContent = `0${num1}`;
    } else if (!operator && !num1.includes(".")) {
        display.textContent += buttonText;
        num1 += buttonText;
    } else if (operator && !num2) {
        num2 = buttonText;
        display.textContent += `0${num2}`;
    } else if (operator && !num2.includes(".")) {
        display.textContent += buttonText;
        num2 += buttonText;
}}

decimalBtn.addEventListener("click", (e) => onDecimalClick(e))

let currentOperatorSpan = null;

operateBtns.forEach(
    button => button.addEventListener("click", () => {
        if (num2) {
            onEqlBtnClick();
        }
        if (currentOperatorSpan && display.contains(currentOperatorSpan)) {
            display.removeChild(currentOperatorSpan)
        }
        const operatorSpan = document.createElement("span");
        operatorSpan.textContent = `${button.textContent}`;
        display.appendChild(operatorSpan);
        operator = operatorSpan.innerText.trim();

        currentOperatorSpan = operatorSpan;
    }
))

const onEqlBtnClick = function() {
    if (num2 === undefined || num2 === "") {
        display.textContent = num1;
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

squareBtn.addEventListener("click", () => {
    if (!num1) return;
    num1 = square(num1)
    display.textContent = Math.round(num1 * 100000) / 100000;
})

sqrtBtn.addEventListener("click", () => {
    if (!num1) return;
    num1 = sqrt(num1);
    display.textContent = Math.round(num1 * 100000) / 100000;
})

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

function square(num1) {
    return num1 ** 2
}

function sqrt(num1) {
    return num1 ** 0.5
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
