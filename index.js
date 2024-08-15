let username = '';
let category = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;
let timerInterval;
let startTime;

// Questions for different categories (You can add more categories and questions)
const questionBank = {
    "General Knowledge": [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Chaucer", "Austen"], answer: 0 },
        { question: "What is the largest ocean?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: 0 }
    ],
    "Science": [
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: 0 },
        { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: 0 },
        { question: "What is the speed of light?", options: ["299,792,458 m/s", "150,000,000 m/s", "100,000 m/s", "500,000,000 m/s"], answer: 0 }
    ],
    "History": [
        { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], answer: 0 },
        { question: "In which year did World War I begin?", options: ["1914", "1939", "1945", "1920"], answer: 0 },
        { question: "Who discovered America?", options: ["Christopher Columbus", "Leif Erikson", "Marco Polo", "Vasco da Gama"], answer: 0 }
    ]
};

// Start Quiz
function startQuiz() {
    username = document.getElementById('username').value;
    if (username === '') {
        alert('Please enter your name');
        return;
    }
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');
    loadQuestion();
    startTimer();
}

// Select Category
function selectCategory(cat) {
    category = cat;
    questions = questionBank[category];
    document.getElementById('category-name').innerText = category;
    startQuiz();
}

// Load Question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h3>${currentQuestion.question}</h3>
        ${currentQuestion.options.map((option, index) => `
            <button onclick="checkAnswer(${index})">${option}</button>
        `).join('')}
    `;
}

// Check Answer
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    attempts++;
    if (selectedIndex === currentQuestion.answer) {
        score++;
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// Next Question
function nextQuestion() {
    loadQuestion();
}

// End Quiz
function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');
    document.getElementById('result-username').innerText = `Name: ${username}`;
    document.getElementById('result-time').innerText = `Time Taken: ${formatTime(Date.now() - startTime)}`;
    document.getElementById('result-total-questions').innerText = `Total Questions: ${questions.length}`;
    document.getElementById('result-attempts').innerText = `Attempts: ${attempts}`;
    document.getElementById('result-correct').innerText = `Correct Answers: ${score}`;
    document.getElementById('result-wrong').innerText = `Wrong Answers: ${attempts - score}`;
    document.getElementById('result-score').innerText = `Final Score: ${score}`;
}

// Restart Quiz
function restartQuiz() {
    location.reload();
}

// Go Home
function goHome() {
    location.reload();
}

// Timer Function
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        document.getElementById('timer').innerText = `Time: ${formatTime(elapsed)}`;
    }, 1000);
}

// Format Time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Initial Page Setup
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home-page').classList.add('active');
});
