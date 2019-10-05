function init(){
	ctx = canvas.getContext("2d");
	canvas = document.getElementById('canvas');
	cw = canvas.width;
	ch = canvas.height;
	game = new Game();
}

window.addEventListener('keyup', function(e){
	var key = e.keyCode;
	game.move(key)
});