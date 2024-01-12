/*
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
*/

// an OOD approach

class Calculator {
    constructor() {
        this.currentInput = "";
        this.number1 = null;
        this.number2 = null;
        this.currentOperator = null;
        this.shouldResetScreen = false;

        this.initializeEventHandlers();
    }

    resetScreen() {
        display.textContent = '';
        this.currentInput = '';
        this.shouldResetScreen = false;
    }

    updateDisplay(value) {
        if (display.textContent === '0' || this.shouldResetScreen) this.resetScreen();
        display.textContent += value;
        this.currentInput += value;
    }

    handleNumberClick() {
        const digits = document.querySelectorAll('.digit');
        digits.forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent === '.' && this.currentInput.includes('.')) return;
                this.updateDisplay(button.textContent);
            });
        });
    }

    handleOperatorClick() {
        const operators = document.querySelectorAll('.button-container button');
        operators.forEach(button => {
            button.addEventListener('click', () => {
                if (!this.currentInput) return;
                if (this.currentOperator != null) {
                    this.operate();
                }
                this.number1 = parseFloat(this.currentInput);
                this.currentOperator = button.textContent;
                this.shouldResetScreen = true;
            });
        });
    }

    add(num1, num2) {
        return num1 + num2;
    }

    subtract(num1, num2) {
        return num1 - num2;
    }

    multiply(num1, num2) {
        return num1 * num2;
    }

    divide(num1, num2) {
        if (num2 === 0) {
            alert("Division by 0 is forbidden!");
            this.clear();
            return null;
        } else {
            return (num1 / num2).toFixed(3);
        }
    }

    operate() {
        if (this.currentOperator === null || !this.currentInput) return;
        this.number2 = parseFloat(this.currentInput);
        let result;
        switch (this.currentOperator) {
            case '+':
                result = this.add(this.number1, this.number2);
                break;
            case '-':
                result = this.subtract(this.number1, this.number2);
                break;
            case 'x':
                result = this.multiply(this.number1, this.number2);
                break;
            case '/':
                result = this.divide(this.number1, this.number2);
                if (result === null) return;
                break;
            default:
                alert("Operator Unknown!");
                return;
        }
        display.textContent = Math.round(result * 1000) / 1000;
        this.currentInput = result.toString();
        this.currentOperator = null;
    }

    clear() {
        this.currentInput = '';
        this.number1 = null;
        this.number2 = null;
        this.currentOperator = null;
        display.textContent = '0';
    }

    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        display.textContent = this.currentInput || '0';
    }

    handleKeyboardInput(event) {
        if (event.key >= '0' && event.key <= '9') {
            this.updateDisplay(event.key);
        } else if (event.key === ".") {
            if (!this.currentInput.includes('.')) {
                this.updateDisplay(event.key);
            }
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            this.handleOperator(event.key);
        } else if (event.key === "Enter") {
            this.operate();
        } else if (event.key === "Backspace") {
            this.backspace();
        }
        event.preventDefault();
    }

    handleOperator(key) {
        if (!this.currentInput) return;
        if (this.currentOperator != null) {
            this.operate();
        }
        this.number1 = parseFloat(this.currentInput);
        this.currentOperator = key;
        this.shouldResetScreen = true;
    }

    initializeEventHandlers() {
        document.getElementById('equal').addEventListener('click', () => 
            this.operate());
        document.getElementById('clear').addEventListener('click', () => 
            this.clear());
        document.getElementById('backspace').addEventListener('click', () => this.backspace());
        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event));
        this.handleNumberClick();
        this.handleOperatorClick();   
    }  
}

const calc = new Calculator();