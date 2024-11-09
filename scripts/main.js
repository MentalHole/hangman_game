const words = ["javascript", "frontend", "developer", "browser", "hangman"];
const chosenRandomWord = words[Math.floor(Math.random() * words.length)];

let guessedWord = Array(chosenRandomWord.length).fill("_");
let wrongGuesses = 0;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const submitKey = document.getElementById("submitKey");
const submitLetter = document.getElementById("submitLetter");
const message = document.getElementById("message");

wordDisplay.textContent = guessedWord.join(" ");
message.innerText = `${chosenRandomWord.length} букв`;
console.log(chosenRandomWord);
const hangmanCanvas = document.getElementById("hangmanCanvas");
const context = hangmanCanvas.getContext("2d");

function drawHangman() {
    console.log(wrongGuesses)
  switch (wrongGuesses) {
    case 1: // Draw the base
        context.moveTo(50, 350);
        context.lineTo(150, 350);
        context.stroke();
      break;
    case 2: // Draw the pole
        context.moveTo(100, 350);
        context.lineTo(100, 50);
        context.stroke();
      break;
    case 3: // Draw the top bar
        context.moveTo(100, 50);
        context.lineTo(200, 50);
        context.stroke();
      break;
    case 4: // Draw the rope
        context.moveTo(200, 50);
        context.lineTo(200, 100);
        context.stroke();
      break;
    case 5: // Draw the head
        context.beginPath();
        context.arc(200, 130, 30, 0, Math.PI * 2, true);
        context.stroke();
      break;
    case 6: // Draw the body
        context.moveTo(200, 160);
        context.lineTo(200, 250);
        context.stroke();
      break;
    case 7: // Draw the left arm
        context.moveTo(200, 180);
        context.lineTo(170, 220);
        context.stroke();
      break;
    case 8: // Draw the right arm
        context.moveTo(200, 180);
        context.lineTo(230, 220);
        context.stroke();
      break;
    case 9: // Draw the left leg
        context.moveTo(200, 250);
        context.lineTo(170, 300);
        context.stroke();
      break;
    case 10: // Draw the right leg
        context.moveTo(200, 250);
        context.lineTo(230, 300);
        context.stroke();
    default:
        message.innerText = "Вы проиграли ☹️"
        break
  }
}
letterInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    submitLetter.click();
  }
});

submitLetter.addEventListener("click", () => {
  const letter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!letter || letter.length !== 1) {
    message.textContent = "Пожалуйста, введите одну букву!";
    return;
  }

  if (guessedWord.includes(letter)) {
    message.textContent = "Эта буква уже отгадана!";
    return;
  }

  let found = false;
  for (let i = 0; i < chosenRandomWord.length; i++) {
    if (chosenRandomWord[i] === letter) {
      guessedWord[i] = letter;
      found = true;
    }
  }

  wordDisplay.textContent = guessedWord.join(" ");

  if (!guessedWord.includes("_")) {
    message.innerText = "Поздравляем, вы выиграли!";
    submitLetter.disabled = true;
  }

  if (!found) {
    wrongGuesses += 1;
    drawHangman();
  }
});

window.onload = () => {
  letterInput.focus();
};
