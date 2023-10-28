// Question 1
// {
//      question: "What does API stand for in coding?";
//      choices: ["application programming interface", "attribute processing inadeqacy", "abstraction passkey indexing", "algorithm partition ideation"];
//      answer: "application programming interface"
// }
const question_1 = {
      questionString: "What does API stand for in coding?",
      choices: ["application programming interface", "attribute processing inadeqacy", "abstraction passkey indexing", "algorithm partition ideation"],
      answer: "application programming interface"
};

const question_2 = {

      questionString: "What does DOM stand for in coding?",
      choicesString: ["database operator matrix", "debugger origin mining", "deployment online mainframe", "document object model"],
      answer: "document object model"
 };

// Question 3

const question_3 = {

      questionString: "What does JSON stand for in coding?",
      choices: ["jailbreak scalable offline network", "JavaScript Object Notation", "joystick super oscillation navigation", "jitter stabilization over normal"],
      answer: "JavaScript Object Notation"
};

const question_4 = {
     questionString: "How do you implement timers?",
     choices: ["setClock() and clearClock()", "setTime() and clearTime()", "setInterval() and clearInterval()", "setDuration() and clearDuration()"],
     answer: "setInterval() and clearInterval()"
}

const question_5 = {

     questionString: "How do you handle click events?",
     choices: ["addClickHandler()", "addButtonEar()", "addPressSense()", "addEventListener()"],
     answer: "addEventListener()"
}



var startQuiz = document.querySelector(".start-quiz-button");
var timerElement = document. querySelector(".timer-count");
var timer;
var timerCount;
var finishedQuestions = false;

function displayQuestion(question) {
    const mainContent = document.getElementById("main-area");

    // Clear the main area
    mainContent.innerHTML = "";

    // Create elements for the question and options
    const questionElement = document.createElement("p");
    questionElement.textContent = question.questionString;

    const choicesList = document.createElement("ul");
    question.choices.forEach(function(choice) {
        const choiceItem = document.createElement("li");
        choiceItem.textContent = choice;


        // Attach event listener to choiceItem element
        choiceItem.addEventListener("click", function() {
            if (choiceItem.textContent === question.answer) {
                console.log("Correct!");
            } else {
                console.log("Wrong!");
            }
        });


        choicesList.appendChild(choiceItem);
    });

    // Append the question and options to the main section
    mainContent.appendChild(questionElement);
    mainContent.appendChild(choicesList);



}

function startGame() {
    finishedQuestions = false;
    timerCount = 60;
    startTimer()
    displayQuestion(question_1); // function

}


// update highscores function
// function updateHighscores() {
//
// }

startQuiz.addEventListener("click", startGame);

// // Attach event listener to choiceItem element
// choiceItem.addEventListener("click", function() {
//     if (choiceItem === question.answer) {
//         console.log("Correct!");
//     } else {
//         console.log("Wrong!");
//     }
// });

// init function made potentially

// startTimer() function
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // tests if finished questions condition is met
            if (finishedQuestions && timerCount > 0) {
                // ADD LOCAL STORAGE OF REMAINING TIME CODING LINE HERE
                // setHighscore();
                clearInterval(timer);
                // gameFinished();

            }
        }

        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            // gameFinished();
        }
    }, 1000);
}


