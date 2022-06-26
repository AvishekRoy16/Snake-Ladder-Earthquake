/// add method in string prototype
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var form =  document.getElementById('form')
var player1, player2, player3;
form.addEventListener('submit', function(event){
	event.preventDefault()
	player1 = document.getElementById('p1').value
	player2 = document.getElementById('p2').value
	player3 = document.getElementById('p3').value
	console.log(player1)
	console.log(player2)
	console.log(player3)     
	// window.location.href="home.html";	
});
// setTimeout(function(){
// alert(player1)},10000)
var SnakeLadderModule = (function(){
	var snakes = {
	  16: 6,
	  46: 25,
	  49: 11,
	  62: 19,
	  64: 60,
	  74: 53,
	  89: 68,
	  92: 88,
	  95: 75,
	  99: 80
	};
	var ladders = {
	  2: 38,
	  7: 14,
	  8: 31,
	  15: 26,
	  21: 42,
	  28: 84,
	  36: 44,
	  51: 67,
	  71: 91,
	  78: 98,
	  87: 94
	};
	setTimeout(function(){
	var players = [{
	  name: player1,
	  position: 0,
	  bg: '#f55bf5'
	}, {
	  name: 'Sanvi',
	  position: 0,
	  bg: '#75ff79'
	}, {
	  name: 'Rani',
	  position: 0,
	  bg: '#fffb76'
	}];},10000)
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
		for(var i=0; i<players.length; i++) {
			var player = players[i];
			var playerHtml = "<span id='player"+i+"' class='player' style='background-color:"+player.bg+"'></span>";
			var playerLegendHtml = "<div id='playerLegend"+i+"' class='legends' style='background-color:"+player.bg+"'>"+player.name+"<span>0</span></div>";
			$("#players").append(playerHtml + playerLegendHtml);
		}
	}
	function RandomizeDice() {
	  return Math.floor(Math.random() * 6) + 1;
	}
	var init = function() {
			initUI();
			setTimeout(function(){
			BuildPlayers();},10000)
			$("#playerLegend"+(idOfplayerTurn)).addClass('active');
		}
	var rollDice = function() {
		  var randm = RandomizeDice();
		  idOfplayerTurn = idOfplayerTurn%players.length;
		  
		  $(".legends").removeClass('active');
		  $("#playerLegend"+((idOfplayerTurn+1)%players.length)).addClass('active');
		  
		  var currentPosition = players[idOfplayerTurn].position;
		  currentPosition += randm;
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
				  return false;
				}
			  });
			  $.each(ladders, function(key, value) {
				if (currentPosition == key) {
				  currentPosition = value;
				  return false;
				}
			  });
			  debugger;
			  //$("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
			  var $cell = $("#cell_" + currentPosition);
			  $("#player" + idOfplayerTurn).css({'left':$cell.position().left + 30,'top':$cell.position().top + 35});
			  $("#playerLegend"+idOfplayerTurn).find('span').text(currentPosition); //currentPosition  
			  
			  var re = /(\d)/;
			  var imgSrc = $('#dice').attr("src");
			  var imgSrc = imgSrc.replace(re, randm);
			  $('#dice').attr("src", imgSrc);
        
			}
      
      
      
      players[idOfplayerTurn].position = currentPosition;
			idOfplayerTurn++;
      
      },3000)
    		}
		
	return {
		Init: init,
		RollDice: rollDice
	};
})();


SnakeLadderModule.Init();

$("button").on("click", function() {
	SnakeLadderModule.RollDice();
});