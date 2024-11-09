const words = ["javascript", "frontend", "developer", "browser", "hangman"]
const chosenRandomWord = words[Math.floor(Math.random() * words.length)]

let guessedWord = Array(chosenRandomWord.length).fill("_")
let wrongGuesses = 0

const wordDisplay = document.getElementById("wordDisplay")
const letterInput = document.getElementById("letterInput")
const submitLetter = document.getElementById("submitLetter")
const message = document.getElementById("message")
const hangmanCanvas = document.getElementById("hangmanCanvas")
const context = hangmanCanvas.getContext("2d")

wordDisplay.textContent = guessedWord.join(" ")
message.innerText = `${chosenRandomWord.length} букв`
console.log(chosenRandomWord)
function drawHangman() {
    context.lineWidth = 2
    if (wrongGuesses === 1) {
        context.moveTo(10, 100)
        context.lineTo(90, 100)

    } else if(wrongGuesses === 2) {
        context.moveTo(50, 100)
        context.lineTo(50, 20)
    }
}

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

            if (!guessedWord.includes("_")) {
                message.innerText = "Поздравляем, вы выиграли!";
                submitLetter.disabled = true;
            }
        }
    }

    wordDisplay.textContent = guessedWord.join(" ");

    if (!found) {
        wrongGuesses += 1;
        drawHangman();
    }

});
