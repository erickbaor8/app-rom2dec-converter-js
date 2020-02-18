let input = document.querySelector('input[type="text"]');
let output = document.querySelector('.output');
const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
const decimalNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

input.addEventListener('keyup', event => {
    event.preventDefault();

    if (event.code === "Enter") {
      const value = input.value.trim();

      if (isDecimal(value)) {
        renderResult(decimalToRoman(value));
      } else if (isRoman(value.toUpperCase())) {
        renderResult(romanToDecimal(value.toUpperCase()));
      } else {
        alert("Invalid number!");
      }
    }
});

function romanToDecimal(roman) {
    roman = roman.split('');
    let decimal = 0;
    let size = roman.length;
    let i = 0;
    let j = 1;

    while (size > 0) {
        if (roman[i] === 'M' || roman[i] === 'D' || roman[i] === 'L' || roman[i] === 'V') {
            if (roman[i] === 'M') decimal += 1000;
            if (roman[i] === 'D') decimal += 500;
            if (roman[i] === 'L') decimal += 50;
            if (roman[i] === 'V') decimal += 5;

            i++;
            j++;
            size--;
        }

        if (roman[i] === 'C') {
            if (roman[j] === 'D' || roman[j] === 'M') {
                if (roman[j] === 'D') decimal += 400;
                if (roman[j] === 'M') decimal += 900;

                i += 2;
                j += 2;
                size -= 2;
            } else {
                decimal += 100;
                i++;
                j++;
                size--;
            }
        }

        if (roman[i] === 'X') {
            if (roman[j] === 'L' || roman[j] === 'C') {
                if (roman[j] === 'L') decimal += 40;
                if (roman[j] === 'C') decimal += 90; 

                i += 2;
                j += 2;
                size -= 2;
            } else {
                decimal += 10;
                i++;
                j++;
                size--;
            }  
        }

        if (roman[i] === 'I') {
            if (roman[j] === 'V' || roman[j] === 'X') {
                if (roman[j] === 'V') decimal += 4;
                if (roman[j] === 'X') decimal += 9;

                i += 2;
                j += 2;
                size -= 2;
            } else {
                decimal += 1;
                i++;
                j++;
                size--;
            }  
        }
    }
    
    return decimal;
}

function renderResult(result) {
  let element = document.createElement("div");
  element.className = "result";
  element.innerHTML += `<span>${result}</span>`
  output.insertAdjacentElement("afterbegin", element);
}

function isRoman(roman) {
    return hasRomansCharacters(roman) && hasRightRomanPatterns(roman);
}

function isDecimal(decimal) {
    decimal = decimal.split('');

    for (let i=0; i<decimal.length; i++) {
        if (!decimalNumbers.includes(parseInt(decimal[i]))) {
            return false;
        } 
    }

    return true;
}

function hasRomansCharacters(roman) {
    roman = roman.split('');

    for (let i=0; i<roman.length; i++) {
        if (!romanNumerals.includes(roman[i])) {
            return false;
        }
    }

    return true;
}

function hasRightRomanPatterns(roman) {
    if (
      roman.includes("IIII") ||
      roman.includes("VV") ||
      roman.includes("XXXX") ||
      roman.includes("LL") ||
      roman.includes("CCCC") ||
      roman.includes("DD") ||
      roman.includes("MMMM")
    )
      return false;

    return true;
}