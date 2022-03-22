const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const startingSeconds = 30;
const quizCountdown = document.getElementById("quizCountdown");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quizTimer = startingSeconds;

let questions = [
  {
    question: "Which HTML element do we put the JavaScript in?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href= 'xxx.js'>",
    choice2: "<script name= 'xxx.js'>",
    choice3: "<script src= 'xxx.js'>",
    choice4: "<script file= 'xxx.js'>",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: "In the NFL what is a triple crown?",
    choice1: "Throwing a TD, Recieving a TD, and Rushing a TD in a single game",
    choice2: "Rushing, Recieving, and Throwing for 100 yards in a single game",
    choice3: "Winning three races during the Kentucky Derby",
    choice4:
      "Leading the league in Receptions, Receiving yards, and Receiving TDs in a single season",
    answer: 4,
  },
  {
    question: "Who was the last triple crown winner and what year?",
    choice1: "Cooper Kupp 2021",
    choice2: "Randy Moss 2004",
    choice3: "Davante Adams 2019",
    choice4: "Calvin Johnson 2009",
    answer: 1,
  },
];

/* Quiz timer */

let timeInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  let seconds = quizTimer;
  seconds = seconds < 10 ? "0:0" + seconds : seconds;
  seconds = seconds < 31 ? "0:" + seconds : seconds;
  quizCountdown.innerHTML = `${seconds}`;
  quizTimer--;
  if (quizTimer < 0) {
    clearInterval(timeInterval);
    endGame();
  }
}

/* Constants */

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
const INCORRECT_PENALTY = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length < 0 || questionCounter > MAX_QUESTIONS) {
    endGame();
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // let classToApply = "incorrect";
    // if (selectedAnswer == currentQuestion.answer) {
    //   classToApply = "correct";
    // }

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      quizTimer -= INCORRECT_PENALTY;
      updateTimer();
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

const saveScore = () => {
  let initials = prompt("Please enter your initials");
  localStorage.setItem(
    "score",
    JSON.stringify({
      initials,
      score,
    })
  );
};

function endGame() {
  saveScore();
  return window.location.assign("leaderboard.html");
}

startGame();
