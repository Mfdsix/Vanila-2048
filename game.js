class Game{
	constructor(){
		this.values = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		this.valids = [];
		this.beginGame();
	}
	initBoard(){
		for(var i = 1; i < 4; i++){
			// vertical
			ctx.beginPath();
			ctx.fillStyle = '#333';
			ctx.fillRect(cw*i/4, 0, 2, ch);
			ctx.closePath();
			// horizontal
			ctx.beginPath();
			ctx.fillStyle = '#333';
			ctx.fillRect(0, ch*i/4, cw, 2);
			ctx.closePath();
		}
	}
	beginGame(){
		var rand1 = this.randomNumber();
		var rand2 = this.randomNumber(rand1);

		this.values[rand1-1] = 2;
		this.values[rand2-1] = 2;
		this.draw();
	}
	draw(){
		ctx.clearRect(0,0,cw,ch);
		this.initBoard();
		for(var i = 1; i <= 16; i++){
			if(this.values[i-1] > 0){
				var divide = Math.floor((i-1)/4)+1;
				var mod = (i%4 == 0) ? 4 : i%4 ;
				ctx.beginPath();
				ctx.fillStyle = '#333';
				ctx.font = 'bold 40px Arial';
				ctx.textAlign = 'center';
				ctx.fillText(this.values[i-1], (mod*60)+((mod-1)*60), (divide*60)+((divide-1)*60)+10);
				ctx.closePath();
			}
		}
	}
	randomNumber(cur = 0){
		var random = Math.floor((Math.random()*16) + 1);
		if(random == cur){
			random = this.randomNumber(cur);
		}
		return random;
	}
	move(key){
		if(key == 39){//right
			if(this.isValidMove(key)){
				this.valids.forEach((value)=>{
					var divide = Math.floor((value-1)/4)+1;
					var dst = divide*4;
					this.moveNumber(value,dst);
				})
				this.draw();
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}else if(key == 37){//left
			if(this.isValidMove(key)){
				this.valids.forEach((value)=>{
					var divide = Math.floor((value-1)/4)+1;
					var dst = (divide-1)*4+1;
					this.moveNumber(value,dst);
				})
				this.draw();
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}else if(key == 38){//up
			if(this.isValidMove(key)){
				console.log(this.valids);
				// this.valids.forEach((value)=>{
				// 	var divide = Math.floor((value-1)/4)+1;
				// 	var dst = (divide-1)*4+1;
				// 	this.moveNumber(value,dst);
				// })
				// this.draw();
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}else if(key == 40){//down
			if(this.isValidMove(key)){
				console.log(this.valids);
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}
	}
	isValidMove(key){
		var valid = false;
		for(var i = 1; i <=4; i++){
			for(var ii = 1; ii <= 4; ii++){
				if(key == 39 && ii < 4 && this.values[4*(i-1)+ii-1] != 0 && (this.values[4*(i-1)+ii] == 0 || this.values[4*(i-1)+ii+1] == 0 || this.values[4*(i-1)+ii+2] == 0)){
					this.valids.push(4*(i-1)+ii);
					valid = true;
				}else if(key == 37 && ii > 1 && this.values[4*(i-1)+ii-1] != 0 && (this.values[4*(i-1)+ii-2] == 0 || this.values[4*(i-1)+ii-3] == 0 || this.values[4*(i-1)+ii-4] == 0)){
					this.valids.push(4*(i-1)+ii);
					valid = true;
				}else if(key == 38 && i > 1 && this.values[4*(ii-1)+i-1] != 0 && (this.values[4*(ii-2)+i-1] == 0 || this.values[4*(ii-3)+i-1] == 0 || this.values[4*(ii-4)+i-1] == 0)){
					this.valids.push(4*(ii-1)+i);
					valid = true;
				}
			}
		}
		return valid;
	}
	moveNumber(src,dst){
		if(this.values[dst-1] == 0){
			this.values[dst-1] = this.values[src-1];
			this.values[src-1] = 0;
		}else{
			this.moveNumber(src, dst-1);
		}
	}
}