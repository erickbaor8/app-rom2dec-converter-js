let input = document.querySelector('input[type="text"]');
const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
const decimalNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

input.addEventListener('keyup', event => {
    event.preventDefault();

    if (event.code === "Enter") {
      if (isDecimal(input.value.trim())) {
        alert("Valid decimal numeral!");
      } else if (isRoman(input.value.trim().toUpperCase())) {
        alert("Valid roman numeral!");
      } else {
        alert("Invalid number!");
      }
    }
});

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