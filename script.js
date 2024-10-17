let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let startBtn = document.getElementById("startBtn");
let submitBtn = document.getElementById("submitBtn");
let retryBtn = document.getElementById("retryBtn");
let resetBtn = document.getElementById("resetBtn");
let difficultySelector = document.getElementById("difficulty");
let result = document.getElementById("result");

let easyQuotes = [
    "The sun rises in the east.",
    "Time waits for no one.",
    "You only live once.",
    "Fortune favors the bold.",
    "Dream big and dare to fail.",
    "Actions speak louder than words."
];

let mediumQuotes = [
    "Success is not final, failure is not fatal.",
    "Do not go where the path may lead.",
    "Challenges are what make life interesting.",
    "The best way out is always through.",
    "You are never too old to set another goal.",
    "In the middle of difficulty lies opportunity."
];

let hardQuotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "It is not length of life, but depth of life that matters.",
    "You miss 100% of the shots you don’t take.",
    "The journey of a thousand miles begins with one step.",
    "A person who never made a mistake never tried anything new.",
    "Don’t watch the clock,do what it does;Keep going."
];

let selectedQuote = "";
let time = 0;
let timerInterval;

function getRandomQuote(difficulty) {
    let quotes;
    if (difficulty === "easy") {
        quotes = easyQuotes;
    } else if (difficulty === "medium") {
        quotes = mediumQuotes;
    } else if (difficulty === "hard") {
        quotes = hardQuotes;
    }
    return quotes[Math.floor(Math.random() * quotes.length)];
}

difficultySelector.addEventListener("change", function () {
    let difficulty = difficultySelector.value;
    if (difficulty) {
        selectedQuote = getRandomQuote(difficulty);
        quoteDisplay.textContent = selectedQuote;
        quoteInput.value = "";
        quoteInput.disabled = true;  // Disable the input until start is clicked
        startBtn.disabled = false;    // Enable the start button
        result.textContent = "";
        timer.textContent = "0 Seconds";
        retryBtn.style.display = "none"; // Hide retry button
    }
});

startBtn.addEventListener("click", function () {
    quoteInput.disabled = false;  // Enable the input
    quoteInput.focus();           // Focus on input
    startBtn.disabled = true;     // Disable the start button after starting
    submitBtn.disabled = false;   // Enable the submit button

    time = 0;
    timerInterval = setInterval(function () {
        time += 1;
        timer.textContent = time + " Seconds";
    }, 1000);  // Update the timer every second
});

submitBtn.addEventListener("click", function () {
    clearInterval(timerInterval);  // Stop the timer
    if (quoteInput.value === selectedQuote) {
        result.textContent = "You typed correctly in " + time + " seconds!";
        retryBtn.style.display = "none";  // Hide retry button
    } else {
        result.textContent = "Incorrect! Try again.";
        retryBtn.style.display = "inline-block";  // Show retry button
    }
    submitBtn.disabled = true;   // Disable submit button after submitting
});

retryBtn.addEventListener("click", function () {
    quoteInput.value = "";  // Clear input
    quoteInput.focus();     // Focus on input
    submitBtn.disabled = false;  // Enable submit button
    retryBtn.style.display = "none";  // Hide retry button
    result.textContent = "";  // Clear result message
});

resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);  // Stop the timer
    time = 0;                      // Reset the time
    timer.textContent = "0 Seconds";  // Reset the timer display
    quoteInput.value = "";         // Clear the input field
    quoteInput.disabled = true;    // Disable the input field
    startBtn.disabled = true;      // Disable the start button
    submitBtn.disabled = true;     // Disable the submit button
    quoteDisplay.textContent = "Select a difficulty to see the sentence.";  // Reset the displayed quote
    retryBtn.style.display = "none";  // Hide the retry button
    result.textContent = "";  // Clear the result message
});

