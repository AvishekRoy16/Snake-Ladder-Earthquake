/// add method in string prototype
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var form =  document.getElementById('form')
var player1, player2, player3;
var SnakeLadderModule = (function(){
	var snakes = {
	  36: 15,
	  41: 19,
	  79: 58,
	  92: 71,
	  95: 34,
	};
	var ladders = {
	  8: 14,
	  10: 29,
	  17: 43,
	  28: 74,
	  31: 70,
	  45: 84,
	  61: 98,
	};

	const quizData = [
		{
			question: "Which language runs in a web browser?",
			a: "Java",
			b: "C",
			c: "Python",
			d: "javascript",
			correct: "d",
		},
		{
			question: "What does CSS stand for?",
			a: "Central Style Sheets",
			b: "Cascading Style Sheets",
			c: "Cascading Simple Sheets",
			d: "Cars SUVs Sailboats",
			correct: "b",
		},
		{
			question: "What does HTML stand for?",
			a: "Hypertext Markup Language",
			b: "Hypertext Markdown Language",
			c: "Hyperloop Machine Language",
			d: "Helicopters Terminals Motorboats Lamborginis",
			correct: "a",
		},
		{
			question: "What year was JavaScript launched?",
			a: "1996",
			b: "1995",
			c: "1994",
			d: "none of the above",
			correct: "b",
		},
	];
	

	const quiz= document.getElementById('quiz')
	const answerEls = document.querySelectorAll('.answer')
	const questionEl = document.getElementById('question')
	const a_text = document.getElementById('a_text')
	const b_text = document.getElementById('b_text')
	const c_text = document.getElementById('c_text')
	const d_text = document.getElementById('d_text')
	const submitBtn = document.getElementById('submit')
	let currentQuiz = 0
	// let score = 0
	function Randomizequiz() {
		return Math.floor(Math.random() * quizData.length);
	}
	var qt = Randomizequiz();
	loadQuiz()
	function loadQuiz() {
		deselectAnswers()
		const currentQuizData = quizData[qt]
		questionEl.innerText = currentQuizData.question
		a_text.innerText = currentQuizData.a
		b_text.innerText = currentQuizData.b
		c_text.innerText = currentQuizData.c
		d_text.innerText = currentQuizData.d
	}
	function deselectAnswers() {
		answerEls.forEach(answerEl => answerEl.checked = false)
	}
	function getSelected() {
		let answer
		answerEls.forEach(answerEl => {
			if(answerEl.checked) {
				answer = answerEl.id
			}
		})
		return answer
	}
	var ans = function(){
		const answer = getSelected()
		if(answer === quizData[currentQuiz].correct){
			return "true"
		}else{
			return "false"
		}
	}


	
	// submitBtn.addEventListener('click', () => {
		
	// })
	

	var idOfplayerTurn = 0;
	/// Create snake-ladder board
	function initUI() {
		for (var i = 0; i < 10; i++) {
			var decrow = $('<div class="row"></div>');
			for (var j = 0; j < 10; j++) {
			  var disVal = 0;
			  if (i % 2 == 0) {
				disVal = (10 * i + j + 1);
			  } else {
				disVal = (10 * i + 10 - j);
			  }
			  disVal = 100 - disVal + 1;
			  decrow.append('<div id="cell_' + disVal + '"></div>'); //' + disVal + '
			}
			$('#snakenladderBoard').append(decrow[0].outerHTML);
		}
		
	}			
	/// Build Players 
	function BuildPlayers() {
		var players = [{
			name: player1,
			position: 1,
			bg: '#f55bf5'
		  }, {
			name: player2,
			position: 1,
			bg: '#75ff79'
		  }, {
			name: player3,
			position: 1,
			bg: '#fffb76'
		  }];
		for(var i=0; i<players.length; i++) {
			var player = players[i];
			var playerHtml = "<span id='player"+i+"' class='player' style='background-color:"+player.bg+"'></span>";
			var playerLegendHtml = "<div id='playerLegend"+i+"' class='legends' style='background-color:"+player.bg+"'>"+player.name+"<span>0</span></div>";
			$("#players").append(playerHtml + playerLegendHtml);
		}
	}

	var players = [{
		name: player1,
		position: 1,
		bg: '#f55bf5'
	  }, {
		name: player2,
		position: 1,
		bg: '#75ff79'
	  }, {
		name: player3,
		position: 1,
		bg: '#fffb76'
	  }];

	function RandomizeDice() {
	  var roll_val = Math.floor(Math.random() * 6) + 1;
	  return roll_val
	}


	var init = function() {
			initUI();	
			BuildPlayers();
			for(var i=0; i<players.length; i++) {
				var player = players[i];
				var $cell = $("#cell_" + player.position);
				$("#player" + i).css({'left':$cell.position().left + 30,'top':$cell.position().top + 35});
				$("#playerLegend"+i).find('span').text(player.position); //currentPosition
			}
			$("#playerLegend"+(idOfplayerTurn)).addClass('active');
		}
		
		

	var rollDice = function() {
		  var randm = RandomizeDice();
		  idOfplayerTurn = idOfplayerTurn%players.length;
		  $("button").attr('disabled', true);
		  $(".legends").removeClass('active');
		  if(randm != 6){$("#playerLegend"+((idOfplayerTurn+1)%players.length)).addClass('active');}
		  else{
			$("#playerLegend"+((idOfplayerTurn)%players.length)).addClass('active');
		  }
		  var currentPosition = players[idOfplayerTurn].position;
		  currentPosition += randm;
		  	if(currentPosition>100){
				currentPosition = 100
			}				
	
      		var $cell = $("#cell_" + currentPosition);
			$("#player" + idOfplayerTurn).css({'left':$cell.position().left + 30,'top':$cell.position().top + 35});
			$("#playerLegend"+idOfplayerTurn).find('span').text(currentPosition); //currentPosition  
		  setTimeout(function(){
      if(currentPosition >= 100) {
			
			currentPosition = 100;
			$("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
			$("#playerLegend"+idOfplayerTurn).find('span').text('Winner'); //currentPosition
			$("button").attr('disabled', 'disabled');
		  } else {
			  $.each(snakes, function(key, value) {
				if (currentPosition == key) {
				  currentPosition = value;
				  var tom1 = new Audio("sounds/tom-1.mp3");
      				tom1.play();
				  return false;
				}
			  });
			  $.each(ladders, function(key, value) {
				if (currentPosition == key) {
				  currentPosition = value;
				  var tom1 = new Audio("sounds/tom-1.mp3");
      				tom1.play();
				  return false;
				}
			  });

			  //$("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
			  var $cell = $("#cell_" + currentPosition);
			  $("#player" + idOfplayerTurn).css({'left':$cell.position().left + 30,'top':$cell.position().top + 35});
			  $("#playerLegend"+idOfplayerTurn).find('span').text(currentPosition); //currentPosition  

        
			}
			
      		players[idOfplayerTurn].position = currentPosition;
			for(j=0;j<players.length;j++){
				if(j == idOfplayerTurn)
				{
					continue
				}
				if(players[idOfplayerTurn].position == players[j].position){
					players[j].position = 1
					var $cell = $("#cell_" + 1);
					$("#player" + j).css({'left':$cell.position().left + 30,'top':$cell.position().top + 35});
					$("#playerLegend"+j).find('span').text(1); //currentPosition
					break
				}
			}
			
			if(randm != 6){
				idOfplayerTurn++;
			}

			if(currentPosition != 100){$("button").attr('disabled', false);}		  
      },3000)
    		}
	return {
		Init: init,
		RollDice: rollDice,
	};
})();

form.addEventListener('submit', function(event){
	event.preventDefault()
	player1 = document.getElementById('p1').value
	player2 = document.getElementById('p2').value
	player3 = document.getElementById('p3').value   
	document.getElementById('p1').style.visibility='hidden';
	document.getElementById('p2').style.visibility='hidden';
	document.getElementById('p3').style.visibility='hidden';
	document.getElementById('t1').style.visibility='hidden';
	document.getElementById('t2').style.visibility='hidden';
	document.getElementById('t3').style.visibility='hidden';
	document.getElementById('but').style.visibility='hidden';
	SnakeLadderModule.Init();
	// window.location.href="home.html";	
});

$(document).ready(function(){
	$("#but").click(function(){
	  $("#roll").css('display', 'block');
	});
  });




function rollfun(){
	SnakeLadderModule.RollDice();
}



let popup  = document.getElementById("popup");
function openPopup(){
	setTimeout(function(){
		popup.classList.add("open-popup");
		
	},3000);
	
}
function closePopup(){
	popup.classList.remove("open-popup");}


function showDiv() {
	document.getElementById('welcomeDiv').style.display = "block";}








// New for info display
disasterinfo={'019':"this is first",'119':'this is second'}

const quesinfo = document.getElementById('infoques')

let popupinfo  = document.getElementById("popupinfo");
function openPopupforinfo(){
	setTimeout(function(){
		popupinfo.classList.add("open-popup");
		
	},100);
	
}
function closePopupinfo(){
	popupinfo.classList.remove("open-popup");}

//   popup for info for the snake and ladder

function showCoords(event) 
{
		var x1 = (event.clientX-368)/96 ;
		var y1 = (event.clientY+980)/97 ;
		c1=~~x1.toString();
		c2=~~y1.toString();
		c3=c1.toString()+c2.toString();
		quesinfo.innerText =disasterinfo[c3];
		openPopupforinfo()
		document.getElementById("demo").innerHTML = coords;
}			
