var questionArea = document.getElementById("question-box");
var timeCount = document.getElementById("theTime");
var startBtn = document.getElementById("startButton");
var answersSpace = document.getElementById("qList");
var enterNameBoard = document.getElementById("endGame");
var submitForm = document.getElementById("enter-name")

var yourName = "";

var timeleft = 0;

var countDown;

var questionNumberIndex = 0;
var currentQuestion;

function startQuiz(event){
    event.preventDefault();

    document.querySelector(".loadScreen").setAttribute("class", "hide");

    questionArea.removeAttribute("class")

    startTimer();

    askQuestion();

}

function askQuestion(){
    currentQuestion = questions[questionNumberIndex];

    var questionTitle = document.getElementById("ask-question");
    questionTitle.textContent = currentQuestion.question;

    var theQuestions = currentQuestion.answers;
    answersSpace.innerHTML = "";

    for(let i = 0; i < theQuestions.length; i++){
        var nextAnswer = document.createElement("LI");
        nextAnswer.setAttribute("class", "purple")

        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "purple answer-button")
        answerButton.setAttribute("index", i);
        answerButton.textContent = theQuestions[i];
        nextAnswer.appendChild(answerButton);
        answersSpace.appendChild(nextAnswer);
    }
           
    questionNumberIndex++;

}


function startTimer(){

    //give 10 seconds per question
    timeleft = questions.length * 10;

    countDown = setInterval(() => {
        timeCount.textContent = timeleft;
        timeleft--; 
        
        if(timeleft == 0){
            stopTimer();
            gameOver();
        }
    }, 1000);

}

function stopTimer(){
    clearInterval(countDown);
}

//when called will hide he questions, whether complete or time ran out
//then show the final screen to enter user name for scoreboard
function gameOver(){
    questionArea.setAttribute("class", "hide");
    stopTimer();
    enterNameBoard.removeAttribute("class");
    timeCount.textContent ="Game Over"
    document.getElementById("your-score").textContent = timeleft;
}

//fucntion to take user name and highscore and put to local
function endGame(){
    
    //ensures the user actaully entered a name
    if(yourName === ""){
        alert("Please enter a name.");
        return;
    }

    //grab the highscores from the local storage
    var highScores = JSON.parse(localStorage.getItem("allScores"));

    //if there are no highscores stored locally yet 
    //then set highScores to an empty string to prevent an error
    if (highScores == null){
        highScores = [];
    }

    //add user score to the array of scores as an object
    highScores.push({name: yourName, score: timeleft});

    //sort the arry by score in decending order
    highScores.sort( (x , y) => y.score - x.score);

    //place arary with new score sorted back into storage
    localStorage.setItem("allScores", JSON.stringify(highScores));
    
    //load highscores page of site
    window.open("highScores.html", "_self");

}

//this is the listener for the UL list when the user selects an answer
questionArea.addEventListener("click", event => {
    var element = event.target;

    if(element.tagName === "BUTTON"){
        console.log(element.textContent);
        var buttons = document.querySelectorAll("button[index]");

        if(element.getAttribute("index") === currentQuestion.answerKey){
            element.setAttribute("class", "green answer-button")
        }else{
            element.setAttribute("class", "red answer-button")
            buttons[currentQuestion.answerKey].setAttribute("class", "green answer-button");
            timeleft -= 10;
        }
        if(questionNumberIndex >= questions.length || timeleft <= 0){
            setTimeout(() => {
                gameOver();
            }, 750);
        }else{
            setTimeout(() => {
                askQuestion();
            }, 750);
        }
    }


});

//this listne is for the start button on the start screen
//when pressed will "start" the quiz by calling func starQuiz
startBtn.addEventListener("click", startQuiz);


//listen event to watch for form submit when user hit enter
//will grab user name from the text box and time remaining
submitForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    yourName =  document.getElementById("name-text").value.trim();
    endGame();
})







