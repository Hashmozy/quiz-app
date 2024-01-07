// Question banker
const questions = [
  {
    question: "What is the largest animal in the world?",
    answer: [
      { text: "Elephant", correct: false },
      { text: "Ostrich", correct: false },
      { text: "Whale", correct: true },
      { text: "Shark", correct: false },
    ],
  },
  {
    question: "What is the largest predator in the world?",
    answer: [
      { text: "Leopard", correct: false },
      { text: "Lion", correct: false },
      { text: "Cheater", correct: false },
      { text: "Tiger", correct: true },
    ],
  },
  {
    question: "Which country has the largest population?",
    answer: [
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "Nigeria", correct: false },
      { text: "America", correct: false },
    ],
  },
  {
    question: "Which is the fastest animal in the world?",
    answer: [
      { text: "Leopard", correct: false },
      { text: "Ostrich", correct: false },
      { text: "Cheater", correct: false },
      { text: "peregrine falcon", correct: true },
    ],
  },
  {
    question: "How many continents are there?",
    answer: [
      { text: "8", correct: false },
      { text: "5", correct: false },
      { text: "7", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "The largest lake in the world is?",
    answer: [
      { text: "Superior", correct: true },
      { text: "L.Victoria", correct: false },
      { text: "Huron", correct: false },
      { text: "Tanganyika", correct: false },
    ],
  },
];

// initializing variables
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// start quiz function
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

// show quiz function
function showQuestion() {
  // reset state of the quiz
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // add buttons for each question in answers array
  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    // add event listener to each button
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// show next question function
function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
  //   nextBtn.innerHTML = "Next";
  //   nextBtn.disabled = false;
  //   nextBtn.style.display = "block";
  //   questionElement.innerText = "";
}

// select answer function
function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  //console.log(selectedBtn.dataset.correct);
  if (correct) {
    score++;
    selectedBtn.classList.add("correct");
    // nextBtn.innerHTML = "Correct";
    // nextBtn.disabled = true;
    // nextBtn.style.display = "block";
    // questionElement.innerText = "";
    // answerBtn.innerText = "";
    // answerBtn.style.display = "none";
    // nextBtn.style.display = "none";
    // showQuestion();
  } else {
    selectedBtn.classList.add("incorrect");
    // nextBtn.innerHTML = "Wrong";
    // nextBtn.disabled = true;
    // nextBtn.style.display = "block";
    // questionElement.innerText = "";
    // answerBtn.innerText = "";
    // answerBtn.style.display = "none";
    // nextBtn.style.display = "none";
    // showQuestion();
  }

  // check if all questions are answered
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

// function showScore() {
//   resetState();
//   let scoreDiv = document.getElementById("score");
//   scoreDiv.innerText = "Your score is " + score;
//   scoreDiv.style.display = "block";
//   nextBtn.style.display = "none";
//   nextBtn.innerHTML = "Start Again";
//   nextBtn.addEventListener("click", startQuiz);
// }

// show score function
function showScore() {
  resetState();
  questionElement.innerHTML = `Your score is   ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Start Again";
  nextBtn.style.display = "block";
}

// next button function
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// event listener for next button
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
  //   if (nextBtn.innerHTML === "Next") {
  //     currentQuestionIndex++;
  //     showQuestion();
  //   } else {
  //     alert("You have completed the quiz");
  //     startQuiz();
  //   }
});

// start quiz function
startQuiz();
