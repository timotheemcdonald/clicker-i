let score = 0;
document.getElementById("score").innerHTML = score;

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
    }

}

function increaseScore(amount){

    score = score + amount;
    document.getElementById("score").innerHTML = score;  
      
}

setInterval( () => {
    score = score + cursors;
    score = score + grammas * 5;
    document.getElementById("score").innerHTML = score;  
}, 1000) 
//1000 = 1000ms = 1 second