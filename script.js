let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.innerText = formatNumber(currentOperand);
    if (operation != null) {
        previousOperandElement.innerText = `${formatNumber(previousOperand)} ${getOperatorSymbol(operation)}`;
    } else {
        previousOperandElement.innerText = '';
    }
}

function getOperatorSymbol(op) {
    switch (op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        default: return '';
    }
}

function formatNumber(number) {
    if (number === 'Error') return number;
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    shouldResetScreen = false;
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === 'Error') return;
    if (operation !== undefined) {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentOperand = 'Error';
                operation = undefined;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    shouldResetScreen = true;
    updateDisplay();
}

function toggleSign() {
    if (currentOperand === '0' || currentOperand === 'Error') return;
    if (currentOperand.startsWith('-')) {
        currentOperand = currentOperand.slice(1);
    } else {
        currentOperand = '-' + currentOperand;
    }
    updateDisplay();
}

function percent() {
    if (currentOperand === 'Error') return;
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay();
}

// Initial display
updateDisplay();
