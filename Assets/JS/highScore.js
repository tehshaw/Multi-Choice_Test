var theHighScores = JSON.parse(localStorage.getItem("allScores"));
var scoreBoard = document.getElementById("highScoreList");

function showScores(){
    
    if(theHighScores === null){
        scoreBoard.innerText= "";
        return;
    }

    for (let x = 0; x < theHighScores.length; x++){
        var person = theHighScores[x];
        var score = document.createElement("LI");   

        score.textContent = person.name + ": " + person.score;

        x === 0 ? score.setAttribute("id", "first-place") :
        x === 1 ? score.setAttribute("id", "second-place") :
        x === 2 ? score.setAttribute("id", "third-place") :
        score.setAttribute("id", "score-display");
        
        scoreBoard.appendChild(score);
    }
}

function clearScores(){
    theHighScores = null;
    localStorage.clear();
    showScores();
}

document.getElementById("clearBoard").addEventListener("click", clearScores);

showScores();