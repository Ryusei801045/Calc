
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const screen = calculator.querySelector('.calculator-screen');

let firstValue = '';
let operator = '';
let isWaitingForSecondValue = false;

function calculate(n1, op, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    if (op === 'add') return num1 + num2;
    if (op === 'subtract') return num1 - num2;
    if (op === 'multiply') return num1 * num2;
    if (op === 'divide') return num1 / num2;
}

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = screen.textContent;

    if (!action) {
        if (displayedNum === '0' || isWaitingForSecondValue) {
            screen.textContent = keyContent;
            isWaitingForSecondValue = false;
        } else {
            screen.textContent = displayedNum + keyContent;
        }
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            screen.textContent = displayedNum + '.';
        }
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        if (operator && isWaitingForSecondValue) {
            operator = action;
            return;
        }

        if (firstValue === '') {
            firstValue = displayedNum;
        } else {
            const result = calculate(firstValue, operator, displayedNum);
            screen.textContent = parseFloat(result.toFixed(7));
            firstValue = result;
        }

        operator = action;
        isWaitingForSecondValue = true;
    }

    if (action === 'clear') {
        screen.textContent = '0';
        firstValue = '';
        operator = '';
        isWaitingForSecondValue = false;
    }

    if (action === 'calculate') {
        if (firstValue && operator) {
            const result = calculate(firstValue, operator, displayedNum);
            screen.textContent = parseFloat(result.toFixed(7));
            firstValue = '';
            operator = '';
            isWaitingForSecondValue = false;
        }
    }
});
