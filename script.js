const questions = [
    { question: "What is the capital of France?", options: ["A. Berlin", "B. London", "C. Paris", "D. Madrid"], answer: "C. Paris" },
    { question: "What is the largest planet in our solar system?", options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"], answer: "C. Jupiter" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["A. Harper Lee", "B. J.K. Rowling", "C. Ernest Hemingway", "D. Mark Twain"], answer: "A. Harper Lee" },
    { question: "What is the capital of Japan?", options: ["A. Beijing", "B. Seoul", "C. Tokyo", "D. Bangkok"], answer: "C. Tokyo" },
    { question: "What is the smallest country in the world?", options: ["A. Monaco", "B. Vatican City", "C. San Marino", "D. Liechtenstein"], answer: "B. Vatican City" },
    { question: "What is the chemical symbol for gold?", options: ["A. Au", "B. Ag", "C. Pb", "D. Fe"], answer: "A. Au" },
    { question: "Who painted the Mona Lisa?", options: ["A. Vincent van Gogh", "B. Pablo Picasso", "C. Leonardo da Vinci", "D. Claude Monet"], answer: "C. Leonardo da Vinci" },
    { question: "What is the capital of Canada?", options: ["A. Ottawa", "B. Toronto", "C. Vancouver", "D. Montreal"], answer: "A. Ottawa" },
    { question: "What is the hardest natural substance on Earth?", options: ["A. Gold", "B. Iron", "C. Diamond", "D. Platinum"], answer: "C. Diamond" },
    { question: "What is the longest river in the world?", options: ["A. Amazon River", "B. Nile River", "C. Yangtze River", "D. Mississippi River"], answer: "B. Nile River" }
];

let currentQuestionIndex = 0;
let timeLeft = questions.length * 60; // 1 minute per question
let timerInterval;
let userAnswers = {};

document.addEventListener("DOMContentLoaded", () => {
    shuffleQuestions();
    displayQuestion();
    startTimer();

    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    document.getElementById("prev-btn").addEventListener("click", prevQuestion);
    document.getElementById("skip-btn").addEventListener("click", skipQuestion);
    document.getElementById("submit-btn").addEventListener("click", submitQuiz);
});

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">
            <h2>${question.question}</h2>
            <ul class="options">
                ${question.options.map((option, index) => `
                    <li>
                        <input type="radio" name="q${currentQuestionIndex}" id="q${currentQuestionIndex}o${index}" ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''} onclick="saveAnswer(${currentQuestionIndex}, '${option}')">
                        <label for="q${currentQuestionIndex}o${index}">${option}</label>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = questions.length;

    // Disable Previous button on the first question
    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
    // Disable Next button on the last question
    document.getElementById("next-btn").disabled = currentQuestionIndex === questions.length - 1;
}

function saveAnswer(questionIndex, answer) {
    userAnswers[questionIndex] = answer;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function skipQuestion() {
    nextQuestion();
}

function submitQuiz() {
    clearInterval(timerInterval);
    displayReview();
}

function displayReview() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = questions.map((q, index) => `
        <div class="question">
            <h2>${q.question}</h2>
            <ul class="options">
                ${q.options.map((option) => `
                    <li class="${option === q.answer ? 'correct' : (userAnswers[index] === option ? 'wrong' : '')}">
                        ${option}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');

    document.querySelector(".navigation").classList.add("hidden");
    document.querySelector("footer").classList.add("hidden");
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("time-left").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}
