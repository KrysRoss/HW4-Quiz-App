let storageScore = localStorage.getItem("score");
let score = JSON.parse(storageScore);

document.getElementById("scoreboard-name").innerHTML = score.initials;
document.getElementById("scoreboard-score").innerHTML = score.score;
