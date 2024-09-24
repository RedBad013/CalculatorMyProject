//document Браузер создаёт DOM (Document Object Model) при загрузке страницы, складывает его в переменную document
//addEventListener() Добавляет элементу действие, которое будет выполнено после срабатывания события
document.addEventListener("DOMContentLoaded", ready);
/*todo: .addEventListener Добавляет элементу действие, которое будет 
выполнено после срабатывания события. Например, н
а клик мышки или нажатие клавиши.*/

function ready() {

let buffer = 0;
let bufOp = "";
let lastNum = 0;
let isBuffer = false;
let lastOp = 0;

  function operation(num, op) {
  
    switch (op) {
      case "+": 
        buffer += num;
        buffer = Number(buffer.toFixed(7));
        break;
      
      case "-": 
        buffer -= num;
        buffer = Number(buffer.toFixed(7));
        break;
      
      case "*": 
        buffer *= num;
        buffer = Number(buffer.toFixed(7));
        break;
      
      case "/": 
        buffer /= num;
        buffer = Number(buffer.toFixed(7));
        break;
      
      case "": 
        buffer = num;
        break;
      
      case "%": 
        lastNum = buffer * num/100;
        break;
      
      
      
    }
  }

  function backSpace () {
    buffer = 0; 
    lastNum = 0;
    lastOp = "";
    num = 0;
    op = "";
    inputField.value = "0";
    scale();
  }

  function scale() { 
    const str = inputField.value;
    if (str.length > 7) {
      inputField.style.fontSize = "2rem";
    } else {
      inputField.style.fontSize = "3rem";
    }
  }

  function inputOperation (input) {
    switch (input) {
          case "!": 
          if (buffer != 0) {
            inputField.value = buffer;
          }
          if (inputField.value[0] != "-") {
            inputField.value = "-" + inputField.value;
          } 
          else {
            inputField.value = inputField.value.substring(1);
          }
          break;

          case "%":
          lastNum = Number(inputField.value);
          operation(lastNum, input);
          operation(lastNum, lastOp);
          inputField.value =  buffer;
          isBuffer = true;
          break;

          case "=":
          case "Enter":
            if (!isBuffer) {
              lastNum = Number(inputField.value);
            }
            operation(lastNum, lastOp);
            inputField.value = buffer;
            isBuffer = true;
            break;

          default:
            lastNum = Number(inputField.value);
            if (!isBuffer) {
              operation(lastNum, lastOp);
            }
            inputField.value = buffer;
            bufOp = input;
            isBuffer = true;
            break;
        }
        if (buffer === Infinity) {
          inputField.value = "Error!"
          buffer = 0; 
          lastNum = 0;
          lastOp = "";
          num = 0;
          op = "";
          buffer = 0;
        }
    }

    function inputNumbers (input) {
    
      scale();
      isBuffer = false;
    if (bufOp != "") {
        inputField.value = "0";
        lastOp = bufOp;
        bufOp = "";
      }
      if (inputField.value === "Error!") {
        inputField.value = input;
        return;
      }
      if (inputField.value === "0") {
        if (input === ".") {
          inputField.value = "0.";
        } else {
          inputField.value = input;
        }
      } else {
        if (input === ".") {
          if (!inputField.value.includes(".")) {
            inputField.value += input;
          }
        } else {
          inputField.value += input;
        }
      }
    }

// Здесь обращаемся к html странице ищем клавишу 
const numberBtns = document.querySelectorAll(".btn-num"); 

// здесь изв
const inputField = document.querySelector("#input-field");

  // извлекаем поле для ввода 
  // querySelectorAll 
  let btns = document.querySelectorAll(".btn");
  btns.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (isNaN(buffer) || !Number.isFinite(buffer)) {
        buffer = 0;
        bufOp = "";
        inputField.value = "0";
      }
    });
  });

  numberBtns.forEach((elem) => {
    // forEach - цикл по всем элементам массива кнопок с цифрами
    
    elem.addEventListener("click", () => {
      if (document.querySelector(".btn_active") != null)
        document.querySelector(".btn_active").classList.remove("btn_active");
      elem.classList.add("btn_active");
      // привязываем к обработчику событий анонимную функцию которая вводит цифры в поле для ввода
      inputNumbers(elem.id)
    });
  });

  const operationBtns = document.querySelectorAll(".btn-op");

  operationBtns.forEach((elem) => {
    elem.addEventListener("click", () => {
      inputOperation(elem.id);
    });

    const AcBtn = document.querySelector(".AC");

    AcBtn.addEventListener("click", () => {
      backSpace();
      
    });
  });

// масштабируем поле ввода.

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const action = ["+", "-", "*", "/", "%", "!", "Enter", "="];

  // event вывод события которое он увидел
  document.addEventListener("keydown", function (event) {
    if (numbers.includes(event.key)) {
      inputNumbers (event.key);
    } else if (action.includes(event.key)) {
      inputOperation (event.key);
    } else if (event.key === "Backspace") {
      backSpace();
    }
  });
}

