const numbers = document.querySelectorAll('button.number')
const functions = document.querySelectorAll('button.function')
const operatorButtons = document.querySelectorAll('button.operator')
const screen = document.getElementById('screenContainer')
const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','+', '-', '*', '/', 'x', '÷', '=', 'Enter', 'Backspace', 'c', 'C', '%', 'r', 'R'];
document.addEventListener('keydown', handleKeyboardInput);

let currentEntry = '';
let firstOperand = null;
let operator = null;
let memory = 0;
let mrcPressedOnce = false;
let lastResult = null;


function handleKeyboardInput(e) {
    const key = e.key;

    if (!allowedKeys.includes(key)) return;

    if (!isNaN(key) || key === '.') {
        if (key === '.' && currentEntry.includes('.')) return;
        currentEntry += key;
        updateScreen(firstOperand !== null ? firstOperand + operator + currentEntry : currentEntry); return; 
    }

    if (['+', '-', '*', '/', 'x', '÷'].includes(key)) {
        handleOperator(key === '*' ? 'x' : key === '/' ? '÷' : key);
        if (currentEntry !== '') {
            firstOperand = currentEntry;
            currentEntry = '';
        }
        updateScreen(`${firstOperand}${operator}`);
        return;
    }

    if (key === '=' || key === 'Enter') {
        if (firstOperand !== null && currentEntry !== '' && operator !== null){
            const result = compute(parseFloat(firstOperand), operator, parseFloat(currentEntry));
            updateScreen(result);
            lastResult = result;
            firstOperand = result;
            currentEntry = '';
            operator = null;
        }
        return;
    }

    if (key.toLowerCase() === 'c') {
        handleFunction('AC');
        return;
    }

    if (key === 'Backspace') {
        handleFunction('backspace');
        return;
    }

    if (key === '%') {
        handleFunction('%');
        return;
    }

    if (key.toLowerCase() === 'r') {
        handleFunction('sqrt');
        return;
    }
}



function updateScreen(value) {
   screen.textContent = value || '0';
}



function clickHandler(e) {
        const value = e.target.dataset.value;

        if (value === '.' && currentEntry.includes('.')) return;
        if (currentEntry.length >= 10) return;

        currentEntry += value;
        updateScreen(firstOperand !== null ? firstOperand + operator + currentEntry : currentEntry);
}



numbers.forEach(button => {
    button.addEventListener('click', clickHandler);
});



function handleFunction(value) {
    if (value === 'CE') {
        if (currentEntry !== '') {
            currentEntry = '';
        } else if (operator !== ''){
            operator = '';
        } else {
            firstOperand = '';
        }
        
        updateScreen(firstOperand !== null ? firstOperand + operator || '' : '0');
    }

    if (value === 'AC') {
        firstOperand = null;
        currentEntry = '';
        operator = null;
        updateScreen('0');
    }

    if (value === 'backspace') {
        currentEntry = currentEntry.slice(0, -1);
        updateScreen(firstOperand !== null ? firstOperand + operator + currentEntry : currentEntry || '0');
    }

    if(value === 'sqrt') {
        let target = null;

        if (currentEntry !== '') {
            target = parseFloat(currentEntry);
        } else if (lastResult != null){
            target = parseFloat(lastResult);
        }

        if (target != null) {
            const result = Math.sqrt(target);
            currentEntry = parseFloat(result.toFixed(8)).toString();
            firstOperand = null;
            operator = null;
            updateScreen(firstOperand !== null ? firstOperand + operator + currentEntry : currentEntry);
        }
    }

    if (value === 'M+') {
        memory += parseFloat(currentEntry || firstOperand || '0');
    }

    if (value === 'M-') {
        memory -= parseFloat(currentEntry || firstOperand || '0');

    }

    if (value === 'MRC') {
        if (!mrcPressedOnce) {
            updateScreen(memory.toString());
            currentEntry = memory.toString();
            mrcPressedOnce = true;
        } else {
            memory = 0;
            mrcPressedOnce = false;
        }
    } else {
        mrcPressed = false;
    }

    if (value === '%') {
       let target = null;
       if (currentEntry !== '') {
            target = parseFloat(currentEntry);
       } else if (lastResult !== null) {
            target = parseFloat(lastResult);
       }

        if (target !== null) {
            const result = target / 100;
            currentEntry = result.toString();
            firstOperand = null;
            operator = null;
            updateScreen(firstOperand !== null ? firstOperand + operator + currentEntry : currentEntry);
        }
    }
}



functions.forEach(button => {
    button.addEventListener('click', (e) => {
        handleFunction(e.target.dataset.value);
    });
});



function handleOperator(value) {
    if(value === '=') {
    if (firstOperand !== null && currentEntry !== '') {
        const result = compute(parseFloat(firstOperand), operator, parseFloat(currentEntry));
        updateScreen(result);
        firstOperand = result;
        lastResult = result;
        currentEntry = '';
        operator = null;
    }
    return;
}
    

    if (firstOperand !== null && currentEntry !== '') {
        const result = compute(parseFloat(firstOperand), operator, parseFloat(currentEntry));
        firstOperand = result;
        operator = value;
        currentEntry= '';
        updateScreen(`${firstOperand}${operator}`);
    
    } else if (firstOperand === null && currentEntry !== '') {
        firstOperand = currentEntry;
        operator = value;
        currentEntry = '';
        updateScreen(`${firstOperand}${operator}`);
    
    } else if (firstOperand !== null && currentEntry === ''){
        operator = value;
        updateScreen(`${firstOperand}${operator}`);
    }
  
}



operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        handleOperator(value);
    });
});


function compute(a, operator, b) {
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
        case 'x':
            result = a * b;
            break;
        case '/':
        case '÷':
            if (b === 0) return 'Error'; 
            result = a / b;
            break;
        default:
            return 'Error';
    }

    if (!Number.isInteger(result)) {
        result = parseFloat(result.toPrecision(8));
    }
    return result;

}


