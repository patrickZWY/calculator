let number1;
let number2;
let operator = '';

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
        alert("Cannot divide by 0!");
    }
    else {
        return (num1 / num2).toFixed(3);
    }
}

function operate(number1, number2, operator) {
    if (operator === "+") {
        add(number1, number2);
    }
    else if (operator === "-") {
        subtract(number1, number2);
    }
    else if (operator === "x") {
        multiply(number1, number2);
    }
    else if (operator === "/") {
        divide(number1, number2);
    }
    else {
        alert("Error! Unknown Operator.");
    }
}

