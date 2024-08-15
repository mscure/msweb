const cal = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    expression: '',
    completedExpression: ''
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = cal;

    if (waitingForSecondOperand === true) {
        cal.displayValue = digit;
        cal.waitingForSecondOperand = false;
    } else {
        cal.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    cal.expression += digit;
}

function inputDecimal(dot) {
    if (cal.waitingForSecondOperand === true) return;

    if (!cal.displayValue.includes(dot)) {
        cal.displayValue += dot;
        cal.expression += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = cal;
    const inputValue = parseFloat(displayValue);

    if (operator && cal.waitingForSecondOperand) {
        cal.operator = nextOperator;
        cal.expression = cal.expression.slice(0, -1) + nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        cal.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](cal.firstOperand, inputValue);
        if (result === "Divide by zero") {
            cal.displayValue = "Divide by zero";
        } else {
            cal.displayValue = `${parseFloat(result.toFixed(7))}`;
            cal.firstOperand = result;
        }
        cal.completedExpression = cal.expression.replace(/\*/g, '×').replace(/\//g, '÷');
    }

    cal.waitingForSecondOperand = true;
    cal.operator = nextOperator;
    cal.expression += nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => secondOperand === 0 ? "Divide by zero" : firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
};

function handlePlusMinus() {
    cal.displayValue = (parseFloat(cal.displayValue) * -1).toString();
    cal.expression = cal.expression[0] === '-' ? cal.expression.slice(1) : '-' + cal.expression;
}

function handlePercentage() {
    cal.displayValue = (parseFloat(cal.displayValue) / 100).toString();
    cal.expression += '%';
}

function resetCalculator() {
    cal.displayValue = '0';
    cal.firstOperand = null;
    cal.waitingForSecondOperand = false;
    cal.operator = null;
    cal.expression = '';
    cal.completedExpression = '';
}

function updateDisplay() {
    const display = document.querySelector('.cal-screen');
    const expression = document.querySelector('.cal-expression');
    display.value = cal.displayValue === "Divide by zero" ? cal.displayValue : formatDisplayValue(cal.displayValue);
    expression.value = cal.completedExpression;
    expression.style.visibility = 'visible';
}

function formatDisplayValue(value) {
    if (value === "Divide by zero") return value;
    const [integer, decimal] = value.split('.');
    const formattedInteger = parseFloat(integer).toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (decimal) {
        return `${formattedInteger}.${decimal}`;
    }
    return formattedInteger;
}

updateDisplay();

const keys = document.querySelector('.cal-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        if (target.value === '±') {
            handlePlusMinus();
            updateDisplay();
            return;
        }
        if (target.value === '%') {
            handlePercentage();
            updateDisplay();
            return;
        }
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('dot')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('ac')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('equal')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});