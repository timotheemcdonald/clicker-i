let game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addToScore: function (amount){
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },

    getScorePerSecond: function(){
        let scorePerSecond = 0;
        for(i = 0; i < building.name.length; i++){
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    },
};

let building = {
    name: [
        "Cursor",
        "Grandma",
        "Oven",
        "Factory"
    ],
    image: [
        "🖱️",
        "👵",
        "🍳",
        "🏭"
    ],
    count: [0, 0, 0, 0],
    income: [
        1,
        15,
        155,
        1555
    ],
    cost: [
        10,
        100,
        1000,
        10000,
    ],

    purchase: function(index){
        if (game.score >= this.cost[index]){
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateScore();
            display.updateShop();
        }
    }
};

let display = {
    updateScore: function(){
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + " credits - Let's Click!";
    },
    updateShop: function(){
        document.getElementById("shopContainer").innerHTML = "";
        for(i = 0; i<building.name.length; i++){
            // document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><div>'+building.image[i]+'</div></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> salsa</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
            document.getElementById("shopContainer").innerHTML += '<div class="separator"><div><span class="shopName">'+building.name[i]+' </span></div><button onClick="building.purchase('+i+')">Buy '+building.name[i]+'</button><div>'+building.image[i]+'</div><div>Cost: <span id="'+building.cost[i]+'">'+building.cost[i]+'</span></div><div>Current Amount: <span>'+building.count[i]+'</span></div>'

        }
    }
}

function saveGame(){
    let gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame(){
    let savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if(localStorage.getItem("gameSave") !== null){
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.version !== "undefined") game.version = savedGame.version;
        if (typeof savedGame.buildingCount !== "undefined"){
            for (i = 0; i < savedGame.buildingCount.length; i++){
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined"){
            for (i = 0; i < savedGame.buildingIncome.length; i++){
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined"){
            for (i = 0; i < savedGame.buildingCount.length; i++){
                building.cost[i] = savedGame.buildingCount[i];
            }
        }
     
    }
}

function resetGame(){
    if(confirm("Are you sure you want to reset the game?")){
        let gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function(){
    loadGame();
    display.updateScore();
    display.updateShop();
}

setInterval(function(){
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateScore();
}, 1000)

setInterval( () => {
    saveGame();
}, 30000)