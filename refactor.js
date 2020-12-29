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
            display.updateUpgradtes();
        }
    }
};

let upgrade = {
    name: [
        "Stone Fingers",
        "Iron Fingers",
        "Stone Clicker",
    ],
    description: [
        "Cursors are twice as efficient",
        "Cursors are twice as efficient",
        "Mouse is twice as efficient",
    ],
    image: [
        "👋",
        "👏",
        "🖱️",
    ],
    type: [
        "building",
        "building",
        "click",
    ],
    cost: [
        300,
        500,
        300,
    ],
    buildingIndex: [
        0,
        0,
        -1,
    ],
    requirement: [
        1,
        5,
        1,
    ],
    bonus: [
        2,
        2,
        2,
    ],
    purchased: [
        false,
        false,
        false,
    ],

    purchase: function(index){
        if(!this.purchased[index] && game.score >= this.cost[index]){
            if(this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]){
                game.score -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;
                
                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]){
                game.score -= this.cost[index];
                game.clickValue *= this.bonus[index];
                this.purchased[index] = true;
                
                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
}

let achievement = {
    name: [
        "Stone Fingers",
        "A Humble Start",
        "Fingertastic",
    ],
    description: [
        "Buy 1 Cursor",
        "Gather 1 Salsa",
        "Click the Salsa 1 Time",
    ],
    image: [
        "✨",
        "💖",
        "🌟"
    ],
    type: [
        "building",
        "score",
        "click",
    ],
    requirement: [
        1,
        1,
        1,
    ],
    objectIndex: [
        0,
        -1,
        -1,
    ],
    awarded: [false, false, false,],

    earn: function(index){
        this.awarded[index] = true;
    }
}

let display = {
    updateScore: function(){
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + " credits - Let's Click!";
    },
    updateShop: function(){
        document.getElementById("shopContainer").innerHTML = "";
        for(i = 0; i<building.name.length; i++){
            document.getElementById("shopContainer").innerHTML += '<div class="separator"><div><span class="shopName">'+building.name[i]+' </span></div><button onClick="building.purchase('+i+')">Buy '+building.name[i]+'</button><div>'+building.image[i]+'</div><div>Cost: <span id="'+building.cost[i]+'">'+building.cost[i]+'</span></div><div>Current Amount: <span>'+building.count[i]+'</span></div>'

        }
    },
    updateUpgrades: function(){
        document.getElementById("upgradeContainer").innerHTML = "";
        for(i = 0; i < upgrade.name.length; i++){
            if(!upgrade.purchased[i]){
                if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    document.getElementById("upgradeContainer").innerHTML += '<div class="separator"><div>'+upgrade.image[i]+'</div><div>'+upgrade.name[i]+'</div><div>'+upgrade.description[i]+'</div><div>'+upgrade.cost[i]+' credits</div><button onClick="upgrade.purchase('+i+')">Buy '+upgrade.name[i]+'</button></div>';
                }else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]){
                    document.getElementById("upgradeContainer").innerHTML += '<div class="separator"><div>'+upgrade.image[i]+'</div><div>'+upgrade.name[i]+'</div><div>'+upgrade.description[i]+'</div><div>'+upgrade.cost[i]+' credits</div><button onClick="upgrade.purchase('+i+')">Buy '+upgrade.name[i]+'</button></div>';
                }
            }
        }
    },

    updateAchievements: function(){
        document.getElementById("achievementContainer").innerHTML = "";
        for (i = 0; i < achievement.name.length; i++){
            if (achievement.awarded[i]){
                document.getElementById("achievementContainer").innerHTML += '<div class="separator"><div>'+achievement.image[i]+'</div><div>'+achievement.name[i]+'</div><div>'+achievement.description[i]+'</div>';
            }
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
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
        achievementAwarded: achievement.awarded,
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
            for (i = 0; i < savedGame.buildingCost.length; i++){
                building.cost[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined"){
            for (i = 0; i < savedGame.upgradePurchased.length; i++){
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }
        if (typeof savedGame.achievementAwarded !== "undefined"){
            for (i = 0; i < savedGame.achievementAwarded.length; i++){
                achievement.awarded[i] = savedGame.achievementAwarded[i];
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

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClicks++;
    game.addToScore(game.clickValue);
}, false);

window.onload = function(){
    loadGame();
    display.updateScore();
    display.updateUpgrades();
    display.updateAchievements();
    display.updateShop();
}

setInterval(function(){
    for (i=0; i<achievement.name.length; i++){
        if(achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) achievement.earn(i);
        else if(achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) achievement.earn(i);
        else if(achievement.type[i] == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i);
    }

    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateScore();
    display.updateAchievements();
}, 1000)

setInterval(function(){
    display.updateScore();
    display.updateUpgrades();
}, 10000)

setInterval( () => {
    saveGame();
}, 30000)