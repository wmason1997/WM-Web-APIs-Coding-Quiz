// Define question variables
const question_1 = {
  questionString: "What does API stand for in coding?",
  choices: [
    "application programming interface",
    "attribute processing inadeqacy",
    "abstraction passkey indexing",
    "algorithm partition ideation",
  ],
  answer: "application programming interface",
};

const question_2 = {
  questionString: "What does DOM stand for in coding?",
  choices: [
    "database operator matrix",
    "debugger origin mining",
    "deployment online mainframe",
    "document object model",
  ],
  answer: "document object model",
};

const question_3 = {
  questionString: "What does JSON stand for in coding?",
  choices: [
    "jailbreak scalable offline network",
    "JavaScript Object Notation",
    "joystick super oscillation navigation",
    "jitter stabilization over normal",
  ],
  answer: "JavaScript Object Notation",
};

const question_4 = {
  questionString: "How do you implement timers?",
  choices: [
    "setClock() and clearClock()",
    "setTime() and clearTime()",
    "setInterval() and clearInterval()",
    "setDuration() and clearDuration()",
  ],
  answer: "setInterval() and clearInterval()",
};

const question_5 = {
  questionString: "How do you handle click events?",
  choices: [
    "addClickHandler()",
    "addButtonEar()",
    "addPressSense()",
    "addEventListener()",
  ],
  answer: "addEventListener()",
};

var question_array = [
  question_1,
  question_2,
  question_3,
  question_4,
  question_5,
];

// Define Document Object Model (DOM) variables to reference
const game_end_button = document.getElementById("game-end-button");
const highscores_display = document.getElementById("highscores-display");
const highscores_output_placeholder =
  document.querySelector("#highscores-output");

var currentQuestionIndex = 0;
var question = "";
var initialsEl = document.getElementById("initials");
var finalScore = document.getElementById("span-score-for-time");

var highscores = localStorage.getItem("highscores");

var table_output = "";
// var has_clicked_view_highscores = false;

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

  choicesList = document.createElement("div");
  choicesList.classList.add("option_choices");
  question.choices.forEach(function (choice) {
    const choiceItem = document.createElement("button"); // changed from li to button elements
    choiceItem.classList.add("hovering_add"); // allowed me to target these options in my css stylesheet for hovering color change
    // choiceItem.classList.add("option_choices"); // Want the answer options to stack vertically
    choiceItem.textContent = choice;

    // Attach an event listener to every choiceItem element
    choiceItem.addEventListener("click", function () {
      if (choiceItem.textContent === question.answer) { // correct option was selected
        //prevents options on last question from getting clicked more than once and subtracting points
        if (currentQuestionIndex >= question_array.length) {
          //choicesList.disabled=true;
          choiceItem.removeEventListener();
        }
        feedback.textContent = "Correct";

        //increment question index
        currentQuestionIndex++;

        // display next question
        displayQuestion();
      } else { // incorrect option was selected
        //prevents options on last question from getting clicked more than once and subtracting points
        if (currentQuestionIndex >= question_array.length) {
          //choicesList.disabled=true;
          choiceItem.removeEventListener();
        }
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
  startTimer();
  displayQuestion(); // function
}

startQuiz.addEventListener("click", startGame);

// startTimer() function
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
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
      finalScore.textContent = timerCount;
      game_end_button.classList.remove("hide");
    }

    if (timerCount <= 0) {
      clearInterval(timer); // so that timer will stop
      finalScore.textContent = timerCount;
      game_end_button.classList.remove("hide");
    }
  }, 1000);
}

var initialsSubmit = document.getElementById("submit-initials");

initialsSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highscores_array = JSON.parse(localStorage.getItem("highscores")) || [];
    var new_score = {
      score: timerCount,
      initials: initials,
    };
    highscores_array.push(new_score);
    localStorage.setItem("highscores", JSON.stringify(highscores_array));
    highscores_display.classList.remove("hide");

    console.log(highscores_array);
    console.log(new_score.score);
    console.log(new_score.initials);
    console.log(localStorage.getItem("highscores"));

    var operable_highscores_array = JSON.parse(
      localStorage.getItem("highscores")
    );
    console.log(typeof operable_highscores_array);
    console.log(operable_highscores_array[0].score);
    console.log(operable_highscores_array[0].initials);
    console.log(operable_highscores_array.length);
    //console.log(local)

    highscoresOrder();
  }
});

function highscoresOrder() {
  var highscores_array = JSON.parse(localStorage.getItem("highscores")) || [];

  // sort using https://www.w3schools.com/js/js_array_sort.asp and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for reference
  highscores_array.sort(function (a, b) {
    return b.score - a.score;
  });

  console.log(highscores_array);
  // function displayHighscores();

  var table_output = ""; // Reinitialize to an empty table_output
  // added in a manner similar to https://www.youtube.com/watch?app=desktop&v=eS-FVnhjvEQ&t=61
  for (var individual_highscore of highscores_array) { // re-added the += syntax in the line below because it was only displaying the top score before
    table_output += ` 
            <tr style="text-align: center;">
                <td style="text-align: center;">${individual_highscore.initials}</td>
                <td style="text-align: center;">${individual_highscore.score}</td>
            </tr>
        `;
  }

  highscores_output_placeholder.innerHTML = table_output;
  highscores_display.classList.remove("hide"); // added so View Highscores button works after go back. Ma
}

var clearHighscoresButton = document.getElementById("clear-highscores-button");
clearHighscoresButton.addEventListener("click", function (event) {
  // has_clicked_view_highscores = true;
  //highscores_display.classList.remove("hide");

  event.preventDefault();
  localStorage.removeItem("highscores");
  localStorage.clear();
  highscores_display.classList.add("hide");
  table_output = `
        <tr>
        </tr>
    `;
  highscores_output_placeholder.innerHTML = table_output; // Need the html to be cleared.
  highscoresOrder();
  console.log("highscores have been cleared");
});

var highscores_page_button = document.getElementById("highscores-page-button");
highscores_page_button.addEventListener("click", function (event) {
  //has_clicked_view_highscores = true;
  event.preventDefault();

  // if (has_clicked_view_highscores) {
  //   highscores_page_button.removeEventListener();
  // }

  // if (currentQuestionIndex >= question_array.length) {
  //   highscores_page_button.removeEventListener();
  // }


  highscoresOrder();
  highscores_display.classList.remove("hide");
  //highscores_output_placeholder.innerHTML=table_output;
  console.log("highscores have been displayed from button at top");
});

