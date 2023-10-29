// Define question variables
const question_1 = {
      questionString: "What does API stand for in coding?",
      choices: ["application programming interface", "attribute processing inadeqacy", "abstraction passkey indexing", "algorithm partition ideation"],
      answer: "application programming interface"
};

const question_2 = {

      questionString: "What does DOM stand for in coding?",
      choices: ["database operator matrix", "debugger origin mining", "deployment online mainframe", "document object model"],
      answer: "document object model"
 };


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

var question_array = [question_1, question_2, question_3, question_4, question_5];
var currentQuestionIndex = 0;
var question = '';



var startQuiz = document.querySelector(".start-quiz-button");
var timerElement = document. querySelector(".timer-count");
var timer;
var timerCount;
var finishedQuestions = false;

function displayQuestion() {
    const mainContent = document.getElementById("main-area");
    const feedback = document.getElementById("right-or-wrong-feedback");

    // Check if all questions have been answered/displayed
    if (currentQuestionIndex >= question_array.length) {
        finishedQuestions = true;
        mainContent.innerHTML = "All done! Your final score is " + timerCount + ".\n Enter initials: "; // add time score and prompt for entering initials
        localStorage.setItem("initials", timerCount);
        //setHighscore();
        return;
    }
    
    // Clear the main area
    mainContent.innerHTML = "";

    // Create the current question and pull its subfields
    question = question_array[currentQuestionIndex];

    // Create elements for the question and options
    const questionElement = document.createElement("p");
    questionElement.textContent = question.questionString;

    choicesList = document.createElement("ul");
    question.choices.forEach(function(choice) {
        const choiceItem = document.createElement("li");
        choiceItem.textContent = choice;


        // Attach event listener to choiceItem element
        choiceItem.addEventListener("click", function() {
            if (choiceItem.textContent === question.answer) {
                feedback.textContent = "Correct";

                //increment question index
                currentQuestionIndex = currentQuestionIndex + 1;
                
                // display next question
                displayQuestion();

            } else {
                feedback.textContent = "Wrong";
                timerCount = timerCount - 10; // Subtracts 10 seconds as the penalty for incorrect answer

                // increment question index
                currentQuestionIndex = currentQuestionIndex + 1;

                // display next question
                displayQuestion();

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
    displayQuestion(); // function
    

}


// update highscores function
// function updateHighscores() {
//
// }

startQuiz.addEventListener("click", startGame);


function setHighscore() {

}


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


