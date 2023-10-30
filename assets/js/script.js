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

const game_end_button = document.getElementById("game-end-button");
const highscores_display = document.getElementById("highscores-display");
const highscores_output_placeholder = document.querySelector("#highscores-output");

var question_array = [question_1, question_2, question_3, question_4, question_5];
var currentQuestionIndex = 0;
var question = '';
var initialsEl = document.getElementById('initials');
var finalScore = document.getElementById('span-score-for-time');

var highscores = localStorage.getItem("highscores"); // may need to add a parseing component here

var table_output = "";

var startQuiz = document.querySelector(".start-quiz-button");
var timerElement = document.querySelector(".timer-count");
var timer;
var timerCount;
var finishedQuestions = false;

function displayQuestion() {
    const mainContent = document.getElementById("main-area");
    const feedback = document.getElementById("right-or-wrong-feedback");

    // Check if all questions have been answered/displayed
    if (currentQuestionIndex >= question_array.length) {
        finishedQuestions = true;
        
        game_end_button.classList.remove("hide"); // removes the hide class from game-end-button id div in index file and it is now visible
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

startQuiz.addEventListener("click", startGame);

// startTimer() function
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0 && finishedQuestions) {
            // tests if finished questions condition is met
                // ADD LOCAL STORAGE OF REMAINING TIME CODING LINE HERE
                clearInterval(timer);
                finalScore.textContent = timerCount;
                            
        }

        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            // gameFinished();
        }
    }, 1000);
}


var initialsSubmit = document.getElementById("submit-initials");

initialsSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = initialsEl.value.trim();
    if (initials !== ""){
        var highscores_array = JSON.parse(localStorage.getItem("highscores")) || [];
        var new_score = {
            score: timerCount,
            initials: initials,
        };
        highscores_array.push(new_score);
        localStorage.setItem('highscores', JSON.stringify(highscores_array));
        highscores_display.classList.remove("hide");
        
        console.log(highscores_array);
        console.log(new_score.score);
        console.log(new_score.initials);
        console.log(localStorage.getItem('highscores'));

        var operable_highscores_array = JSON.parse(localStorage.getItem('highscores'));
        console.log(typeof operable_highscores_array);
        console.log(operable_highscores_array[0].score);
        console.log(operable_highscores_array[0].initials);
        console.log(operable_highscores_array.length);
        //console.log(local)

        highscoresOrder();
    }
});

function highscoresOrder(){
    var highscores_array = JSON.parse(localStorage.getItem("highscores")) || [];

    // sort using https://www.w3schools.com/js/js_array_sort.asp and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for reference
    highscores_array.sort(function(a,b){return b.score-a.score});

    console.log(highscores_array);
    // function displayHighscores();

    // var table_output = "";
    // added in a manner similar to https://www.youtube.com/watch?app=desktop&v=eS-FVnhjvEQ&t=61
    for(var individual_highscore of highscores_array){
        table_output += `
            <tr>
                <td>${individual_highscore.initials}</td>
                <td>${individual_highscore.score}</td>
            </tr>
        `;
    };

    highscores_output_placeholder.innerHTML = table_output;
};



var clearHighscoresButton = document.getElementById("clear-highscores-button");
clearHighscoresButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("highscores");
    localStorage.clear();
    highscores_display.classList.add("hide");
    //table_output="";
    highscores_output_placeholder.innerHTML = ""; // Need the html to be cleared.
    console.log("highscores have been cleared");
});

var highscores_page_button = document.getElementById("highscores-page-button");
highscores_page_button.addEventListener("click", function(event){
    event.preventDefault();
    // ADD CONDITIONAL LOGIC TO STOP DUPLICATE SCORES FROM BEING DISPLAYED
    highscoresOrder();
    highscores_display.classList.remove("hide");
    //highscores_output_placeholder.innerHTML=table_output;
    console.log("highscores have been displayed from button at top")
});

//gameEndBtn.setAttribute('class', 'hide');
//gameEndBtn.removeAttribute('class');

