// 1. Questions Array: Stores the questions, possible options, and the correct answer
const questions = [
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<style>", "<script>", "<link>"],
    answer: "<style>"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "How do you declare a JavaScript variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    question: "Which DOM method selects an element by its unique ID?",
    options: ["querySelectorAll()", "getElementById()", "getElementsByClass()", "findElement()"],
    answer: "getElementById()"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval = null;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;

// DOM Elements
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const scoreFooter = document.getElementById("score-footer");
const questionProgress = document.getElementById("question-progress");
const timerDisplay = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackSection = document.getElementById("feedback-section");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const finalScoreDisplay = document.getElementById("final-score");

// 2. shuffleQuestions(): Randomly shuffles the questions so each quiz is different
function shuffleQuestions(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

// 3. startTimer(): Sets a countdown timer for answering each question
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_LIMIT;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      checkAnswer(true); // Auto-evaluate as time expired
    }
  }, 1000);
}

// 4. displayQuestion(): Displays the current question and answer options
function displayQuestion() {
  selectedOption = null;
  submitBtn.disabled = true;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  feedbackSection.className = "feedback hidden";

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
  questionText.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("option-btn");
    button.textContent = option;

    button.addEventListener("click", () => {
      document.querySelectorAll(".option-btn").forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedOption = option;
      submitBtn.disabled = false;
    });

    optionsContainer.appendChild(button);
  });

  startTimer();
}

// 5. checkAnswer(): Checks whether the selected answer is correct and updates the score
function checkAnswer(isTimeUp = false) {
  clearInterval(timerInterval);
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === currentQuestion.answer) {
      btn.classList.add("correct");
    } else if (btn.textContent === selectedOption) {
      btn.classList.add("incorrect");
    }
  });

  feedbackSection.classList.remove("hidden");

  if (!isTimeUp && selectedOption === currentQuestion.answer) {
    score++;
    feedbackSection.textContent = "Correct! Well done.";
    feedbackSection.classList.add("correct");
  } else if (isTimeUp) {
    feedbackSection.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;
    feedbackSection.classList.add("incorrect");
  } else {
    feedbackSection.textContent = `Incorrect. The correct answer was: ${currentQuestion.answer}`;
    feedbackSection.classList.add("incorrect");
  }

  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

// 6. nextQuestion(): Moves to the next question, resetting the timer and updating the screen
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    displayQuestion();
  } else {
    quizSection.classList.add("hidden");
    scoreFooter.classList.remove("hidden");
    finalScoreDisplay.textContent = `Your Score: ${score} / ${shuffledQuestions.length}`;
  }
}

// 7. startQuiz(): Starts the quiz by shuffling the questions, displaying the first question, and starting the timer
function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  shuffledQuestions = shuffleQuestions(questions);

  startSection.classList.add("hidden");
  scoreFooter.classList.add("hidden");
  quizSection.classList.remove("hidden");

  displayQuestion();
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
submitBtn.addEventListener("click", () => checkAnswer(false));
nextBtn.addEventListener("click", nextQuestion);