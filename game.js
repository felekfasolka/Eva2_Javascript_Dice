// global vars
var score, activePlayer, roundScore;

// declare init function
function init() {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
	
    document.querySelector(".btn-hold").disabled = false;
	document.querySelector(".btn-roll").disabled = false;
    document.querySelector(".btn-hold").style.display = 'block';
	document.querySelector(".btn-roll").style.display = 'block';
	
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
	
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
	
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
	
    document.querySelector('.player-0-side').classList.remove('winner');
    document.querySelector('.player-0-side').classList.remove('active');
	
    document.querySelector('.player-1-side').classList.remove('winner');
    document.querySelector('.player-1-side').classList.remove('active');
	
    document.querySelector('.player-0-side').classList.add('active');
}

// declare auto switch to next player function
function nextPlayer(){
    roundScore = 0;
    document.getElementById("current-"+activePlayer).textContent = 0;
    activePlayer = activePlayer == 1 ? 0 : 1;
    document.querySelector(".player-0-side").classList.remove('active');
    document.querySelector(".player-1-side").classList.remove('active');
    document.querySelector(".player-" + activePlayer +"-side").classList.add('active');
}

// call init function
init();

// call init on new game
document.querySelector('.btn-new').addEventListener('click',init);

// roll the dice!
document.querySelector(".btn-roll").addEventListener('click', function(){
	console.log("rolled")
    document.querySelector(".dice").classList.remove('rolled-one');
	var dice = Math.floor(Math.random()*6) + 1 //random number between 1 and 6
	var diceDoc = document.getElementById("dice-1");
	diceDoc.style.display = "block";
	diceDoc.src = 'img/dice-' + dice + '.png';
	if(dice != 1){
		roundScore += dice;
		document.getElementById("current-"+activePlayer).textContent = roundScore;
	}else{
        document.querySelector(".dice").classList.add('rolled-one');
        console.log("rolled one, next player")
		nextPlayer();
	}
})

// Hold the round
document.querySelector(".btn-hold").addEventListener('click', function(){
	score[activePlayer] += roundScore;
	document.getElementById("score-"+activePlayer).textContent = score[activePlayer];
	if(score[activePlayer] >= 100){
		document.getElementById("name-"+activePlayer).textContent = "Winner!";
		document.querySelector('.player-' + activePlayer + '-side').classList.remove('active');
		document.querySelector('.player-' + activePlayer + '-side').classList.add('winner');
		document.getElementById("dice-1").style.display = "none";
		document.querySelector(".btn-hold").style.display = 'none';
		document.querySelector(".btn-roll").style.display = 'none';
	}else{
		nextPlayer();
	}
})
