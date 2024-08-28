const resultElement = document.getElementById('result');
let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
    resultElement.textContent = currentInput;
}

function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    } else if (value === 'AC') {
        currentInput = '0';
        previousInput = null;
        operator = null;
    } else if (value === '←') {
        currentInput = currentInput.slice(0, -1) || '0';
    } else if (value === '=') {
        if (operator && previousInput !== null) {
            currentInput = String(evaluateExpression(previousInput, currentInput, operator));
            operator = null;
            previousInput = null;
        }
    } else {
        if (operator) {
            previousInput = String(evaluateExpression(previousInput, currentInput, operator));
            currentInput = '0';
        } else {
            previousInput = currentInput;
            currentInput = '0';
        }
        operator = value;
    }
    updateDisplay();
}

function evaluateExpression(num1, num2, operator) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    switch (operator) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '×': return n1 * n2;
        case '÷': return n1 / n2;
        case '%': return n1 % n2;
        default: return n2;
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});
