// grabbing of relevant html elements to work with
numbers = document.querySelectorAll(".num");
operators = document.querySelectorAll(".operator");
del = document.querySelector("#cls-partial");
clear = document.querySelector("#cls-complete");
calculate = document.querySelector("#calculate");
row1 = document.querySelector("#input-box");
row2 = document.querySelector("#display-box");
let curOperator = "";
let operatorIndex = null;
// let isOpePresent = false;

//initializing some variable
let firstValue = null,
  secondValue = null;
let ops = ["÷", "+", "-", "x", "%"];

//fuction to check for the presence of operator
function isOpePresent() {
  for (e of ops) {
    if (row1.value.includes(e)) {
      return true;
    }
  }
  return false;
}

// function to prevent more than one dot on a nmber
function isDotEligible() {
  let lastPart = row1.value.slice(row1.value.indexOf(curOperator) + 1);

  if (row1 === "") {
    return true;
  } else if (firstValue === null && !row1.value.includes(".")) {
    return true;
  } else if (firstValue !== null && !lastPart.includes(".")) {
    return true;
  } else {
    return false;
  }
}

// definition of the function to compute result
function compute() {
  if (curOperator === "+") {
    return firstValue + secondValue;
  } else if (curOperator === "-") {
    return firstValue - secondValue;
  } else if (curOperator === "%") {
    console.log(firstValue % secondValue);
    return firstValue % secondValue;
  } else if (curOperator === "x") {
    return firstValue * secondValue;
  } else {
    if (secondValue === 0) {
      row1.style.border = "1.5px solid #ff0000";
      row2.style.border = "1.5px solid #ff0000";
      row1.style.color = "#ff0000";
      row2.style.color = "#ff0000";
      return "Can't devide by Zero";
    } else {
      return firstValue / secondValue;
    }
  }
}

//adding click event listeners to required buttons
numbers.forEach((e) => {
  e.addEventListener("click", function () {
    if (e.textContent === ".") {
      if (isDotEligible()) {
        for (op of ops) {
          if (row1.value.endsWith(op)) {
            row1.value += "0.";
            return;
          }
        }
        if (row1.value === "") {
          row1.value = "0.";
          return;
        } else {
          row1.value += e.textContent;
        }
      }
    }
    row1.value += e.textContent;
  });
});
operators.forEach((e) => {
  e.addEventListener("click", function () {
    // Ensuring user can make use of the result for further computation
    if (row2.value !== "") {
      firstValue = parseFloat(row2.value);
      row1.value = row2.value + e.textContent;
      row2.value = "";
      operatorIndex = row1.value.indexOf(e.textContent);

      curOperator = e.textContent;
    } else if (row1.value === "") {
      firstValue = 0;
      row1.value = firstValue + e.textContent;
      operatorIndex = 1;
      curOperator = e.textContent;
    } else if (isOpePresent()) {
      console.log(isOpePresent());
      alert(
        "For now, you can only use one operator. However, you can use your result for further computation"
      );
    } else {
      row1.value += e.textContent;
      operatorIndex = row1.value.indexOf(e.textContent);
      firstValue = parseFloat(row1.value.slice(0, operatorIndex));
      curOperator = e.textContent;
    }
  });
});

del.addEventListener("click", function () {
  row1.value = row1.value.slice(0, -1);
  row2.value = "";
  if (secondValue === 0) {
    row2.style.border = "none";
    row1.style.border = "none";
    row1.style.color = "black";
    row2.style.color = "black";
  }
});
clear.addEventListener("click", function () {
  row1.value = "";
  row2.value = "";
});

calculate.addEventListener("click", function () {
  //if we only have digits or empty string in the row1
  if (isOpePresent()) {
    secondValue = parseFloat(row1.value.slice(operatorIndex + 1));
    let result = compute();
    row2.value = result;
  } else {
    row2.value = row1.value;
  }
});
