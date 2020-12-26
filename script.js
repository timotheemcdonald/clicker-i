let score = 0;
document.getElementById("score").innerHTML = score;

let clickingPower = 1;
let clickingPowerCost = 50;
document.getElementById("clickingPower").innerHTML = clickingPower;
document.getElementById("clickingPowerCost").innerHTML = clickingPowerCost;

let cursorCost = 15;
let cursors = 0;
document.getElementById("cursorCost").innerHTML = cursorCost;
document.getElementById("cursors").innerHTML = cursors;

let grammaCost = 100;
let grammas = 0;
document.getElementById("grammaCost").innerHTML = grammaCost;
document.getElementById("grammas").innerHTML = grammas;

function buyCursor(){
    if(score >= cursorCost){
        score = score - cursorCost;
        cursors = cursors +1;
        cursorCost = Math.round(cursorCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("cursorCost").innerHTML = cursorCost;
        document.getElementById("cursors").innerHTML = cursors;
        updateScorePerSecond();
    }
}

function buyGramma(){
    if(score >= grammaCost){
        score = score - grammaCost;
        grammas = grammas + 1;
        grammaCost = Math.round(grammaCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("grammaCost").innerHTML = grammaCost;
        document.getElementById("grammas").innerHTML = grammas;
        updateScorePerSecond();
    }

}

function buyClickingPower(){
    if(score >= clickingPowerCost){
        score = score - clickingPowerCost;
        clickingPower = clickingPower + 1;
        clickingPowerCost = Math.round(clickingPowerCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("clickingPowerCost").innerHTML = clickingPowerCost;
        document.getElementById("clickingPower").innerHTML = clickingPower;
    }
}

function increaseScore(clickingPower){

    score = score + clickingPower;
    document.getElementById("score").innerHTML = score;  
      
}

function updateScorePerSecond(){
    scorePerSecond = cursors + grammas * 5;
    document.getElementById("scorepersecond").innerHTML = scorePerSecond;
}

setInterval( () => {
    score = score + cursors;
    score = score + grammas * 5;
    document.getElementById("score").innerHTML = score;  
}, 1000) 
//1000 = 1000ms = 1 second