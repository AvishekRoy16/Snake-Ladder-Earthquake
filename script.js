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
	
	let y = new Boolean(false);

	var questions=[
		"what is Eathquake?",
		"How many different type of natural disasters are there?",
		"NIDM",
		"Landslide prone region",
		"Flood Effects",
		"Is It Safe To Return Home",
	]

	var answers = [5,2,1,4,7,10]

	var questionoptions = { "what is Eathquake?":[1,2,4,5],
	"How many different type of natural disasters are there?":[1,2,3,5],
	"NIDM":[1,2,3,4],
	"Landslide prone region":[1,2,3,4],
	"Flood Effects":[9,8,7,6],
	"Is It Safe To Return Home":[10,11,12,13]
	}


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
	function Randomizequiz() {
		return Math.floor(Math.random() * questions.length);
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
		  console.log(randm)
		  var qt = Randomizequiz();
		  $("#ques").html(questions[qt]);
		  var opt = questionoptions[questions[qt]];
		  $("#option1").html(opt[0]);
		  $("#option2").html(opt[1]);
		  $("#option3").html(opt[2]);
		  $("#option4").html(opt[3]);
		  $("#option1").click(function(){
			if(opt[0]==answers[qt]){
				y = true;
				alert("yes");
				$("#th").html("yes");				
			}
			else{
				y = false;
				alert("no");
				$("#th").html("no");
				
			}
		  })

		  $("#option2").click(function(){
			if(opt[1]==answers[qt]){
				y = true;
				alert("yes");
				$("#th").html("yes");				
			}
			else{
				y = false;
				alert("no");
				$("#th").html("no");
				
			}
		  })
		  
		  $("#option3").click(function(){
			if(opt[2]==answers[qt]){
				y = true;
				alert("yes");
				$("#th").html("yes");				
			}
			else{
				y = false;
				alert("no");
				$("#th").html("no");
				
			}
		  })
		  $("#option4").click(function(){
			if(opt[3]==answers[qt]){
				y = true;
				alert("yes");
				$("#th").html("yes");				
			}
			else{
				y = false;
				alert("no")
				$("#th").html("no");
				
			}
		  })
		  
		  
		  
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
			  debugger;
			  //$("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
			  var $cell = $("#cell_" + currentPosition);
			  $("#player" + idOfplayerTurn).css({'left':$cell.position().left + 30,'top':$cell.position().top + 35});
			  $("#playerLegend"+idOfplayerTurn).find('span').text(currentPosition); //currentPosition  
			  
			//   var re = /(\d)/;
			//   var imgSrc = $('#dice').attr("src");
			//   var imgSrc = imgSrc.replace(re, randm);
			//   $('#dice').attr("src", imgSrc);
        
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
		RollDice: rollDice
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
		quizques();
		
	},3000);
	
}
function closePopup(){
	popup.classList.remove("open-popup");}

function showDiv() {
	document.getElementById('welcomeDiv').style.display = "block";}