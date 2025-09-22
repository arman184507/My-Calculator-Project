const display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operator = null;
let resetNext = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function clearAll() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  resetNext = false;
  updateDisplay();
}

function inputNumber(num) {
  if (resetNext) {
    currentInput = num;
    resetNext = false;
  } else {
    if (currentInput === '0') {
      currentInput = num;
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
}

function inputDecimal() {
  if (resetNext) {
    currentInput = '0.';
    resetNext = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function handleOperator(nextOperator) {
  if (operator && !resetNext) {
    calculate();
  } else {
    previousInput = parseFloat(currentInput);
  }
  operator = nextOperator;
  resetNext = true;
}

function calculate() {
  if (operator == null || resetNext) return;
  let current = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = previousInput + current;
      break;
    case '-':
      result = previousInput - current;
      break;
    case 'x':
      result = previousInput * current;
      break;
    case '/':
      if (current === 0) {
        alert("Error: Division by zero");
        clearAll();
        return;
      }
      result = previousInput / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = result;
  operator = null;
  resetNext = true;
  updateDisplay();
}

function handlePercent() {
  let current = parseFloat(currentInput);
  current = current / 100;
  currentInput = current.toString();
  updateDisplay();
}

// Event listeners
document.querySelectorAll('button.number').forEach(button => {
  button.addEventListener('click', () => inputNumber(button.getAttribute('data-num')));
});

document.getElementById('decimal').addEventListener('click', inputDecimal);

document.getElementById('clear').addEventListener('click', clearAll);

document.getElementById('add').addEventListener('click', () => handleOperator('+'));
document.getElementById('subtract').addEventListener('click', () => handleOperator('-'));
document.getElementById('multiply').addEventListener('click', () => handleOperator('x'));
document.getElementById('divide').addEventListener('click', () => handleOperator('/'));

document.getElementById('equals').addEventListener('click', calculate);

document.getElementById('percent').addEventListener('click', handlePercent);

updateDisplay();

