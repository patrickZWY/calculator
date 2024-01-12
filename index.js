let currentInput = '';
let number1 = null;
let number2 = null;
let currentOperator = null;
let shouldResetScreen = false;

function resetScreen() {
    display.textContent = '';
    currentInput = '';
    shouldResetScreen = false;
}

function updateDisplay(value) {
    if (display.textContent === '0' || shouldResetScreen) resetScreen();
    display.textContent += value;
    currentInput += value;
}

function handleNumberClick() {
    const digits = document.querySelectorAll('.digit');
    digits.forEach(button => {
        button.addEventListener('click', function() {
            updateDisplay(this.textContent);
        });
    });
}

function handleOperatorClick() {
    const operators = document.querySelectorAll('.button-container button');
    operators.forEach(button => {
        button.addEventListener('click', function() {
            if (!currentInput) return;
            if (currentOperator != null) {
                operate();
            }
            number1 = parseFloat(currentInput);
            currentOperator = this.textContent;
            shouldResetScreen = true;
        });
    });
}

function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    if (num2 == 0) {
        alert("Division by 0 is forbidden!");
        clear();
        return null;
    }
    else {
        return (num1 / num2).toFixed(3);
    }
}

function operate() {
    if (currentOperator === null || !currentInput) return;
    number2 = parseFloat(currentInput);
    let result;
    switch (currentOperator) {
        case '+':
            result = add(number1, number2);
            break;
        case '-':
            result = subtract(number1, number2);
            break;
        case 'x':
            result = multiply(number1, number2);
            break;
        case '/':
            result = divide(number1, number2);
            break;
        default:
            alert("Operator Unknown!");
            return;
    }
    display.textContent = Math.round(result * 1000) / 1000;
    currentInput = result.toString();
    currentOperator = null;
}

function clear() {
    currentInput = '';
    number1 = null;
    number2 = null;
    currentOperator = null;
    display.textContent = '0';
}

function initializeEventHandlers() {
    document.getElementById('equal').addEventListener('click', operate);
    document.getElementById('clear').addEventListener('click', clear);
}

initializeEventHandlers();
handleNumberClick();
handleOperatorClick();