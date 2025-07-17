const numbers = document.querySelectorAll('button.number')
const functions = document.querySelectorAll('button.function')
const operator = document.querySelectorAll('button.operator')
const screen = document.getElementById('screenContainer')
let inputArray = [];
let currentEntry = '';


function updateScreen(value) {
   screen.textContent = value || '0';
}



function clickHandler(e) {
        const value = e.target.dataset.value;
        currentEntry += value;
        updateScreen(inputArray.join('') + currentEntry);
}



numbers.forEach(button => {
    button.addEventListener('click', clickHandler);
});



function handleFunction(value) {
    if (value === 'CE') {
        currentEntry = '';
        updateScreen(inputArray.join('') || '0');
    }

    if (value === 'AC') {
        inputArray = []
        currentEntry = '';
        updateScreen('0');
    }

    if (value === 'backspace') {
        currentEntry = currentEntry.slice(0, -1);
        updateScreen(inputArray.join('') + currentEntry || '0');
    }
}



functions.forEach(button => {
    button.addEventListener('click', (e) => {
        handleFunction(e.target.dataset.value);
    });
});

