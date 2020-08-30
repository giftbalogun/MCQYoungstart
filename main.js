//making All Elements Variable For Easy Call
const hide = document.getElementById("hide");
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//Question Variable
let questions = [{
        question: "Based on the passage what is period to which the modern nature writing can be traced to",
        choiceA: "1850 till 1999",
        choiceB: "1850 to 1899",
        choiceC: "1750 till 1899",
        choiceD: "1750 till 1900",
        correct: "C"
    }, {
        question: "Which statement summarizes the above passage",
        choiceA: "The passage talks about the life and lessons of Gilbert White, a profound naturalist and ornithologist.",
        choiceB: "The passage talks about how the nature writing is missing in the modern era and needs to be revived.",
        choiceC: "The passage talks about from where the writers draw inspiration for nature writing, and how its importance is diminishing in the modern era.",
        choiceD: "The passage talks about what nature writing is, the different types of nature writing, its style, and about the roots and pioneer of modern nature writing.",
        correct: "D"
    }, {
        question: "Which word aptly describes the word “reflections” as used in the passage ?",
        choiceA: "Opinion",
        choiceB: "Reproduction",
        choiceC: "Images",
        choiceD: "None of the above",
        correct: "A"
    },
    {
        question: "According to the passage, what kind of works are written as part of nature writing?",
        choiceA: "Natural history essays and essays of solitude or escape",
        choiceB: "Pin",
        choiceC: "Gfit",
        choiceD: "Mase",
        correct: "A"
    },
    {
        question: "Nature writing emphasizes on ",
        choiceA: "Historical facts about the nature",
        choiceB: "Philosophical interpretations of the nature",
        choiceC: "Scientific information and facts",
        choiceD: "All the above",
        correct: "D"
    }
];

// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // Question Time 30s
const gaugeWidth = 150; // Question Time Progess Bar With150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// Render Question to HTML Page
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// Start Quiz Once Start is Clicked
function startQuiz() {
    start.style.display = "none";
    hide.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

//Progress Dot
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// Question Time Counter
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // Change Progress Color to Red whhen Wrong
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // End of Quiz Followed By Score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Check Answers
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // Correct Answer
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // Wrong Answer
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// Correct Answer
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// Wroong Answer
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// Display Score
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the stage based on the scorePerCent
    let stage =
        (scorePerCent >= 80) ? "Nice Work, You Passed" :
        (scorePerCent >= 60) ? "Very Good but Failed" :
        (scorePerCent >= 40) ? "Nice Try but Failed" :
        (scorePerCent >= 20) ? "Poor Result, Failed" :
        "Why did you not make an attempt";;

    scoreDiv.innerHTML = "<h3>" + stage + "</h3>";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}