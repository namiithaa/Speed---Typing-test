const words = [
    'javascript', 'function', 'variable', 'developer', 'array', 'object', 'document', 'browser', 'internet',
    'computer', 'performance', 'keyboard', 'algorithm', 'software', 'hardware', 'intelligence', 'artificial',
    'programming', 'design', 'structure'
];

let currentWord = '';
let time = 0;
let timer;
let isPlaying = false;

const wordDisplay = document.getElementById('word-display');
const inputBox = document.getElementById('input-box');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timeDisplay = document.getElementById('time-display');
const wpmDisplay = document.getElementById('wpm-display');
const accuracyDisplay = document.getElementById('accuracy-display');

// Randomly select a word from the list
function randomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Start the game
function startGame() {
    if (!isPlaying) {
        isPlaying = true;
        time = 0;
        inputBox.disabled = false;
        inputBox.focus();
        currentWord = randomWord();
        wordDisplay.textContent = currentWord;
        inputBox.value = '';
        timer = setInterval(updateTime, 1000);
    }
}

// Update the timer
function updateTime() {
    time++;
    timeDisplay.textContent = time;
}

// Calculate WPM and Accuracy
function calculateStats() {
    const typedWords = inputBox.value.trim().split(' ').length;
    const wpm = Math.round((typedWords / time) * 60);
    wpmDisplay.textContent = wpm;

    const typedText = inputBox.value.trim();
    const correctChars = typedText.split('').filter((char, index) => char === currentWord[index]).length;
    const accuracy = Math.round((correctChars / currentWord.length) * 100);
    accuracyDisplay.textContent = accuracy;
}

// Reset the game
function resetGame() {
    clearInterval(timer);
    isPlaying = false;
    time = 0;
    timeDisplay.textContent = '0';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '0';
    wordDisplay.textContent = 'Click "Start" to begin!';
    inputBox.value = '';
    inputBox.disabled = true;
}

// Event Listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

inputBox.addEventListener('input', () => {
    if (inputBox.value.trim() === currentWord) {
        calculateStats();
        currentWord = randomWord();
        wordDisplay.textContent = currentWord;
        inputBox.value = '';
    }
});