let boxInput = document.querySelector('input[type="text"]');
let boxOutput = document.querySelector(".output");

boxInput.addEventListener("keyup", event => {
  event.preventDefault();

  if (event.code === "Enter") {
    let value = boxInput.value.trim();

    if (isDecimal(value)) {
      renderResult(decimalToRoman(value));
    } else if (isRoman(value.toUpperCase())) {
      renderResult(romanToDecimal(value.toUpperCase()));
    } else {
      renderResult("Invalid number!");
    }
  }
});

function decimalToRoman(decimal) {
  let numDigits = decimal.length - 1;
  let romanNumeral = "";
  let decimalNumber = parseInt(decimal);

  while (decimalNumber > 0) {
    let value = parseInt(decimalNumber / Math.pow(10, lenght));

    if (numDigits === 3) {
        romanNumeral += concatRomans("M", value);
    }

    if (numDigits === 2) {
      if (value !== 0) {
        if (value < 4) romanNumeral += concatRomans("C", value);
        if (value === 4) romanNumeral += concatRomans("CD", 1);
        if (value === 5) romanNumeral += concatRomans("D", 1);
        if (value > 5 && value < 9) {
          romanNumeral += concatRomans("D", 1);
          romanNumeral += concatRomans("C", value - 5);
        }
        if (value === 9) romanNumeral += concatRomans("CM", 1);
      }
    }

    if (numDigits === 1) {
      if (value !== 0) {
        if (value < 4) romanNumeral += concatRomans("X", value);
        if (value === 4) romanNumeral += concatRomans("XL", 1);
        if (value === 5) romanNumeral += concatRomans("L", 1);
        if (value > 5 && value < 9) {
          romanNumeral += concatRomans("L", 1);
          romanNumeral += concatRomans("X", value - 5);
        }
        if (value === 9) romanNumeral += concatRomans("XC", 1);
      }
    }

    if (numDigits === 0) {
      if (value !== 0) {
        if (value < 4) romanNumeral += concatRomans("I", value);
        if (value === 4) romanNumeral += concatRomans("IV", 1);
        if (value === 5) romanNumeral += concatRomans("V", 1);
        if (value > 5 && value < 9) {
          romanNumeral += concatRomans("V", 1);
          romanNumeral += concatRomans("I", value - 5);
        }
        if (value === 9) romanNumeral += concatRomans("IX", 1);
      }
    }

    decimalNumber %= Math.pow(10, numDigits);
    numDigits--;
  }

  return romanNumeral;
}

function concatRomans(str, repetitions) {
  let romanNumeral = "";

  for (let i = 0; i < repetitions; i++) {
    romanNumeral += str;
  }

  return romanNumeral;
}

function romanToDecimal(roman) {
  roman = roman.split("");
  let decimal = 0;
  let size = roman.length;
  let i = 0;
  let j = 1;

  while (size > 0) {
    if (
      roman[i] === "M" ||
      roman[i] === "D" ||
      roman[i] === "L" ||
      roman[i] === "V"
    ) {
      if (roman[i] === "M") decimal += 1000;
      if (roman[i] === "D") decimal += 500;
      if (roman[i] === "L") decimal += 50;
      if (roman[i] === "V") decimal += 5;

      i++;
      j++;
      size--;
    }

    if (roman[i] === "C") {
      if (roman[j] === "D" || roman[j] === "M") {
        if (roman[j] === "D") decimal += 400;
        if (roman[j] === "M") decimal += 900;

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

    if (roman[i] === "X") {
      if (roman[j] === "L" || roman[j] === "C") {
        if (roman[j] === "L") decimal += 40;
        if (roman[j] === "C") decimal += 90;

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

    if (roman[i] === "I") {
      if (roman[j] === "V" || roman[j] === "X") {
        if (roman[j] === "V") decimal += 4;
        if (roman[j] === "X") decimal += 9;

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
  let div = document.createElement("div");
  div.className = "result";
  div.innerHTML += `<span>${result}</span>`;
  boxOutput.insertAdjacentElement("afterbegin", div);
}

function isRoman(roman) {
  return hasRomansCharacters(roman) && hasRightRomanPatterns(roman);
}

function isDecimal(decimal) {
  const decimalNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  decimal = decimal.split("");

  for (let i = 0; i < decimal.length; i++) {
    if (!decimalNumbers.includes(parseInt(decimal[i]))) {
      return false;
    }
  }

  return true;
}

function hasRomansCharacters(roman) {
  const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
  roman = roman.split("");

  for (let i = 0; i < roman.length; i++) {
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