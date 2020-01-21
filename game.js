
var gameState = 'intro';
var runningHorse = 0;
var player1Pos = 0;
var player2Pos = 0;
var interval = 0;
var bg = null;
var gameType = 'x';

window.addEventListener('load', function () {
    bg = document.getElementsByTagName('audio')[0];
    interval = setInterval(update, 50);
});

function startGame() {
    runningHorse = 0;
    player1Pos = 0;
    player2Pos = 0;

    if ($("player1Name").value != '' && $("player2Name").value != '') {
        $('player1').innerHTML = $("player1Name").value;
        $('player2').innerHTML = $("player2Name").value;
        $('horse1').style.left = '0px';
        $('horse2').style.left = '0px';

        gameState = 'started';
        runningHorse = Math.round(Math.random() * 2 + 1);
        bg.src = 'assets/bg.mp3';
        bg.currentTime = 15;
        setActivePlayer(1);
        $("intro").style.display = 'none';
        $("game").style.display = 'block';
    } else {
        alert("Please enter player names!");
    }
}

function setGameType(gt){
    gameType = gt;
    document.getElementById("mathType").innerHTML = gt
}
function update() {
    if (gameState == 'intro') {
        if (bg.currentTime >= 15)
            bg.currentTime = 0;
        return;
    }

    if (gameState == 'ended') {
        clearInterval(interval);
        bg.src = 'assets/win.mp3';
        bg.currentTime = 12;
        $('winnerName').innerHTML = 'The winner: ' + $('player' + runningHorse).innerHTML;
        $("end").style.display = 'block';
        return;
    }

    if (gameState == 'started') {
        if (bg.currentTime >= 47)
            bg.currentTime = 15;

        var pos = 0;
        if (runningHorse == 1)
            pos = ++player1Pos;
        else
            pos = ++player2Pos;

        $('horse' + runningHorse).style.left = pos + 'px';
        $('line').style.left = (Math.max(player1Pos, player2Pos) + 200) + 'px';

        if (pos + 200 >= document.getElementsByClassName('t1')[0].clientWidth) {
            gameState = 'ended';
        }
    }

}

function playAgain(){
    bg.src = 'assets/bg.mp3';
    bg.currentTime = 0;
    gameState = 'intro';
    interval = setInterval(update, 50);
    $("intro").style.display = 'block';
    $("game").style.display = 'none';
    $("end").style.display = 'none';
}

function setActivePlayer(playerNo) {
    $('correct').play();
    runningHorse = playerNo == 1 ? 2 : 1;
    $('player' + playerNo + 'Track').className = 'active';
    $('player' + runningHorse + 'Track').className = '';
    $('horse' + playerNo).src = "assets/static"+playerNo+".png";
    $('horse' + runningHorse).src = "assets/horseOption"+runningHorse+".gif";;
    var n1, n2;
    if(gameType=='x'){
        n1 = Math.round(Math.random() * 5 + 2);
        n2 = Math.round(Math.random() * 5 + 2);
    } else {
        n1 = Math.round(Math.random() * 40 + 10);
        n2 = Math.round(Math.random() * 40 + 10);
    }
    $("number1").innerHTML = n1;
    $("number2").innerHTML = n2;
    $("res").value = '';
}

function checkResult() {
    var sum;
    if(gameType=='x'){
        sum = parseInt($("number1").innerHTML) * parseInt($("number2").innerHTML);
    } else {
        sum = parseInt($("number1").innerHTML) + parseInt($("number2").innerHTML);
    }
    if (parseInt($("res").value) == sum)
        setActivePlayer(runningHorse);
}

function $(id) { return document.getElementById(id); }