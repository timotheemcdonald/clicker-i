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
        "Oven"
    ],
    image: [
        "🖱️",
        "👵",
        "🍳",
    ],
    count: [0, 0, 0],
    income: [
        1,
        15,
        155,
    ],
    cost: [
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
        }
    }
};

let display = {
    updateScore: function(){
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + "credits - Let's Click!";
    },
    updateShop: function(){
        document.getElementById("shopContainer").innerHTML = "";
        for(i =0; i<building.name.length; i++){
            document.getElementById("shopContainer").innerHTML += `
            <div class="separator">
<button onClick="building.purchase('+i+')"></button>
<div>'+building.image[i]+'</div>
<div>'+building.name[i]+'</div>
<div>Cost: <span id="grammaCost">'+building.cost[i]+'</span></div>
<div>Count: <span id="grammas">'+building.count[i]+'</span></div>
</div>`
        }
    }
}

window.onload = function(){
    display.updateScore();
    display.updateShop();
}