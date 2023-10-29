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

const xyz = document.getElementById("game-end-button");
const highscores_display = document.getElementById("highscores-display");

var question_array = [question_1, question_2, question_3, question_4, question_5];
var currentQuestionIndex = 0;
var question = '';
var initialsEl = document.getElementById('initials');



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
        // mainContent.textContent = "All done! Your final score is " + timerCount; // add time score and prompt for entering initials
        // Create <p> element
        // create <input> element
        // create <button> element as 


        // COMMENTING OUT FOR NOW UNLESS WE HAVE TO REVERT
        // const all_done_paragraph = document.createElement("p");
        // all_done_paragraph.textContent = "All done!";
        // const initials_paragraph = document.createElement("p");
        // initials_paragraph.textContent = "Your final score is ";
        // const score_output_paragraph = document.createElement("p");
        // score_output_paragraph.textContent = timerCount;

        // const initials_input = document.createElement("input");
        // initials_input.setAttribute('id', 'initials');

        // const initials_button = document.createElement("button");
        // initials_button.setAttribute('id', 'submit-initials'); 
        // initials_button.textContent = "Submit!";
        // initials_button.addEventListener("click", displayHighscores);

        // mainContent.appendChild(all_done_paragraph);
        // mainContent.appendChild(initials_paragraph);
        // mainContent.appendChild(score_output_paragraph);
        // mainContent.appendChild(initials_input);
        // mainContent.appendChild(initials_button);

        // const xyz = document.getElementById("game-end-button");
        xyz.classList.remove("hide"); // removes the hide class from game-end-button id div in index file and it is now visible
        // game-end-button


        
        //localStorage.setItem("initials", timerCount);
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
                currentQuestionIndex++;
                
                // display next question
                displayQuestion();

            } else {
                feedback.textContent = "Wrong";
                timerCount -= 10; // Subtracts 10 seconds as the penalty for incorrect answer
                timerElement.textContent = timerCount;

                // increment question index
                currentQuestionIndex++;

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

function displayHighscores() {
    
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
        if (timerCount >= 0 && finishedQuestions) {
            // tests if finished questions condition is met
            
                // ADD LOCAL STORAGE OF REMAINING TIME CODING LINE HERE
                // setHighscore();
                clearInterval(timer);
                // gameFinished();

            
        }

        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            // gameFinished();
        }
    }, 1000);
}

//const gameEndDiv = document.getElementById("highscores-display");
var highscoresShouldDisplay = false;

// var initialsSubmit = document.querySelector(".submit-initials");
var initialsSubmit = document.getElementById("submit-initials");

initialsSubmit.addEventListener("click", function () {
    var initials = initialsEl.value.trim();
    if (initials !== ""){
        var highscores_array = JSON.parse(localStorage.getItem("highscores")) || [];
        var new_score = {
            score: timerCount,
            initials: initials,
        };
        highscores_array.push(new_score);
        localStorage.setItem('highscores', JSON.stringify(highscores_array));
        // highscoresShouldDisplay = true;
        highscores_display.classList.remove("hide");
    }


    // highscoresOrder() to display order of highscore
    


});

// const highscores_display = document.getElementById("highscores-display");
//highscores_display.classList.remove("hide");

// trying to toggle the highscores display
// if (highscoresShouldDisplay) {
//     highscores_display.classList.remove("hide");
// } else {
//     highscores_display.classList.add("hide");
// };

function highscoresOrder(){
    gameEndBtn.setAttribute('class', 'hide');
    var highscores_array = JSON.parse(localStorage.getItem("highscores")) || [];
    // ordering for loop
}

//gameEndBtn.setAttribute('class', 'hide');
//gameEndBtn.removeAttribute('class');

