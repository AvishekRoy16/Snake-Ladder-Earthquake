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