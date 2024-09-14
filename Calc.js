//document Браузер создаёт DOM (Document Object Model) при загрузке страницы, складывает его в переменную document
//addEventListener() Добавляет элементу действие, которое будет выполнено после срабатывания события
document.addEventListener("DOMContentLoaded", ready);
document.addEventListener("DOMContentLoaded", keyboardReady);

let buffer = 0;
let bufOp = "";
let lastNum = 0;
let isBuffer = false;
let lastOp = 0;

function operation(num, op) {
  
  switch (op) {
    case "+": 
      buffer += num;
      buffer = Number(buffer.toFixed(12));
      break;
    
    case "-": 
      buffer -= num;
      buffer = Number(buffer.toFixed(12));
      break;
    
    case "*": 
      buffer *= num;
      buffer = Number(buffer.toFixed(12));
      break;
    
    case "/": 
      buffer /= num;
      buffer = Number(buffer.toFixed(12));
      break;
    
    case "": 
      buffer = num;
      break;
    
    case "ё": 
      lastNum = buffer * num/100;
      break;
    
  }
}

// Функция — это блок из различных команд
function ready() {

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
      scale(); 
      // привязываем к обработчику событий анонимную функцию которая вводит цифры в поле для ввода
      if (elem.innerHTML != ".") {
        if (inputField.value == "0" || isBuffer) {
          isBuffer = false;
          inputField.value = elem.innerHTML;
        } else {
          inputField.value += elem.innerHTML;
        }
      } 
      else {
        const str = inputField.value;
        if (!str.includes(".")) {
          if (isBuffer) {
            isBuffer = false;
            inputField.value = "0.";
          } else {
            inputField.value += elem.innerHTML;
          }
        } 
        else if (isBuffer) {
          isBuffer = false;
          inputField.value = "0.";
        }
      }
    });
  });

  const operationBtns = document.querySelectorAll(".btn-op");

  operationBtns.forEach((elem) => {
    elem.addEventListener("click", () => {
      switch (elem.id) {
        case "ъ": 
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

          case "=": 
            if (!isBuffer) {
              lastNum = Number(inputField.value);
            }
            operation(lastNum, bufOp);
            inputField.value = buffer;
            isBuffer = true;
            break;
  
          case "ё":  
            lastNum = Number(inputField.value);
            operation(lastNum, elem.id);
            inputField.value = lastNum;
            isBuffer = false;
            break;
        
          default: 
            lastNum = Number(inputField.value);
            operation(lastNum, bufOp);
            inputField.value = buffer;
            bufOp = elem.id;
            isBuffer = true;
            break;
      }
    });

    const AcBtn = document.querySelector(".AC");

    AcBtn.addEventListener("click", () => {
      if (document.querySelector(".btn_active") != null)
      document.querySelector(".btn_active").classList.remove("btn_active");
      buffer = 0;
      bufOp = "";
      lastNum = 0;
      lastOp = "";
      num = 0;
      op = "";
      inputField.value = "0";
    });
  });

// масштабируем поле ввода.
function scale() { 
  const str = inputField.value;
  if (str.length > 7) {
    inputField.style.fontSize = "2rem";
  } else {
    inputField.style.fontSize = "3rem";
  }
}

}
// ввод с клавиатуры
function keyboardReady() {

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const action = ["+", "-", "*", "/", "ё", "ъ", "Enter", "="];
  const inputField = document.querySelector("#input-field");

  
  // event вывод события которое он увидел
  document.addEventListener("keydown", function (event) {
  if (numbers.includes(event.key)) {
    isBuffer = false;
    if (bufOp != "") {
        inputField.value = "0";
        lastOp = bufOp;
        bufOp = "";
      }
      if (inputField.value === "0") {
        if (event.key === ".") {
          inputField.value = "0.";
        } else {
          inputField.value = event.key;
        }
      } 
      else {
        if (event.key === ".") {
          if (!inputField.value.includes(".")) {
            inputField.value += event.key;
          }
        } else {
          inputField.value += event.key;
        }
      }
    } 
    
    else {
      if (action.includes(event.key)) {
        switch (event.key) {
          case "ъ": 
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

          case "ё":
          lastNum = Number(inputField.value);
          operation(lastNum, event.key);
          operation(lastNum, lastOp);
          inputField.value =  buffer;
          isBuffer = true;
          break;

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
            bufOp = event.key;
            isBuffer = true;
            break;
        }
      }

      // очещает поле ввода значений.
      if (event.key === "Backspace") {
        buffer = 0;
        bufOp = "";
        lastNum = 0;
        lastOp = "";
        num = 0;
        op = "";
        inputField.value = "0";
      }
    }
  });

  
}
