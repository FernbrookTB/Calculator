# Glassmorphic Calculator

A functional, responsive calculator built using HTML, CSS, and JavaScript. It features a sleek glassmorphism design and supports both button and keyboard inputs.

## Features

- Basic operations: addition, subtraction, multiplication, and division
- Keyboard support including number pad and common function keys
- Square root and percentage calculations
- Backspace, Clear Entry (CE), and All Clear (AC) functionality
- Memory functions:
  - `MRC`: Memory recall (press once), memory clear (press twice)
  - `M+`: Add current value to memory
  - `M-`: Subtract current value from memory
- Dynamic screen resizing and layout responsiveness
- Prevents multiple decimal inputs and excessively long expressions

> ⚠️ Memory functions (MRC, M+, M-) are implemented but may not fully mimic real calculator behavior.

## How to Use

- Click on-screen buttons or use your keyboard.
- Use `Enter` or `=` to calculate.
- Press `C` to clear all, or `Backspace` to delete the last digit.
- Press `R` for square root and `%` for percentage.
- Memory functions respond to `M`, `+`, and `-` buttons when applicable.

## Design

- Fully styled with modern glassmorphism techniques
- Adaptive layout that fits different screen sizes
- Button animations and active state feedback for both click and keypress

## Limitations

- The calculator limits the number of digits displayed to avoid overflow
- Memory operations may behave differently than physical calculators
- Percentage and square root apply only to the most recent computed value or current input
- Not working on mobile

## Future Improvements

- Add parentheses and operation chaining
- Improve memory logic to follow standard calculator rules
- Better mobile optimization for very small screens

## Live Demo

[Click here to try it out](https://fernbrooktb.github.io/Calculator/)

