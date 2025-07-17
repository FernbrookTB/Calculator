const numbers = document.querySelectorAll('button.number')
const functions = document.querySelectorAll('button.function')
const operatorButtons = document.querySelectorAll('button.operator')
const screen = document.getElementById('screenContainer')

let currentEntry = '';
let firstOperand = null;
let operator = null;


function updateScreen(value) {
   screen.textContent = value || '0';
}



function clickHandler(e) {
        const value = e.target.dataset.value;

        if (value === '.' && currentEntry.includes('.')) return;

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
        if (currentEntry !== '') {
            const result = Math.sqrt(parseFloat(currentEntry));
            currentEntry = parseFloat(result.toFixed(10)).toString();
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
            return a + b;
        case '-':
            return a - b;
        case '*':
        case 'x':
            return a * b;
        case '/':
        case '÷':
            return b === 0 ? 'Error' : a / b;
        default:
            return 'Error';
    }

}


