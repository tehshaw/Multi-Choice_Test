var questionArea = document.getElementById("question-box");
var timeCount = document.getElementById("theTime");
var startBtn = document.getElementById("startButton");
var answersSpace = document.getElementById("qList");
var enterNameBoard = document.getElementById("endGame");

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
        var nextQuestion = document.createElement("LI");
        nextQuestion.setAttribute("class", "purple")

        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "purple")
        answerButton.dataset.number = i;
        answerButton.textContent = theQuestions[i];

        nextQuestion.appendChild(answerButton);
        answersSpace.appendChild(nextQuestion);
    }
    questionNumberIndex++;

}


function startTimer(){

    if(timeCount.textContent !== 75){
        timeleft = 75;
    }

    countDown = setInterval(() => {
        timeCount.textContent = timeleft;
        timeleft--; 
        
        if(timeleft == 0){
            stopTimer();
            gameOver(false);
        }
    }, 1000);

}

function stopTimer(){
    clearInterval(countDown);
}

function gameOver(){
    questionArea.setAttribute("class", "hide");
    stopTimer();
    enterNameBoard.removeAttribute("class");
}

//listener to check answers for questions
questionArea.addEventListener("click", event => {
    var element = event.target;

    if(element.tagName = "BUTTON"){
        if(element.dataset.number === currentQuestion.answerKey){
            element.setAttribute("class", "green")
        }else{
            element.setAttribute("class", "red")
            timeleft -= 10;
        }
    }
    if(questionNumberIndex > questions.length || timeleft <= 0){
        gameOver();
    }else{
        setTimeout(() => {
            askQuestion();
        }, 500);
    }

});


startBtn.addEventListener("click", startQuiz);

var submitForm = document.getElementById("enter-name")

submitForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    var yourName =  document.getElementById("name-text").textContent;


    

})

