const numbers = document.querySelectorAll('button.number')
const functions = document.querySelectorAll('button.function')
const operator = document.querySelectorAll('button.operator')
const screen = document.getElementById('screenContainer')

function updateScreen(value) {
    if (screen === "0") {
       screen.textContent = value
    } else {
        screen.textContent += value;
    }
}

function clickHandler(e) {
        const value = e.target.dataset.value;
        updateScreen(value);
}

numbers.forEach(button => {
    button.addEventListener('click', clickHandler);
});

function clearAll() {
    screen.textContent = '0';
    inputArray = [];
}