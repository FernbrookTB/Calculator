const numbers = document.querySelectorAll('button.number')
const functions = document.querySelectorAll('button.function')
const operator = document.querySelectorAll('button.operator')
const screen = document.getElementById('screenContainer')
let inputArray = [];

function updateScreen(value) {
    if (screen.textContent === "0") {
       screen.textContent = value
    } else {
        screen.textContent += value;
    }
}

function clickHandler(e) {
        const value = e.target.dataset.value;
        inputArray.push(value);
        updateScreen(value);
}

numbers.forEach(button => {
    button.addEventListener('click', clickHandler);
});

function handleFunction(value) {
    if (value === 'CE') {
        if (inputArray.length === 0) return; 
        inputArray.pop();
        screen.textContent = inputArray.length ? inputArray.join('') : '0';
    }

    if (value === 'AC') {
        inputArray = [];
        screen.textContent = '0';
    }
}

functions.forEach(button => {
    button.addEventListener('click', (e) => {
        handleFunction(e.target.dataset.value);
    });
});

