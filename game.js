class Game{
	constructor(){
		this.values = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		this.colors = [];
		this.colors[2] = "#a4dbd7";
		this.colors[4] = "#4ae88f";
		this.colors[8] = "#b6eb3b";
		this.colors[16] = "#ebd023";
		this.colors[32] = "#e87b1c";
		this.colors[64] = "#e81e0c";
		this.colors[128] = "#1070de";
		this.colors[256] = "#7110e0";
		this.colors[512] = "#dc25e6";
		this.colors[1024] = "#eb348f";
		this.colors[2048] = "#db0f42";
		this.valids = [];
		this.score = 0;
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
		var rand1 = this.randomNumber(16);
		var rand2 = this.randomNumber(16, rand1);

		this.values[rand1-1] = 2;
		this.values[rand2-1] = 2;
		this.draw();
	}
	draw(){
		ctx.clearRect(0,0,cw,ch);
		this.initBoard();
		for(var i = 1; i <= 16; i++){
			var divide = Math.floor((i-1)/4)+1;
			var mod = (i%4 == 0) ? 4 : i%4 ;
			if(this.values[i-1] > 0){
				ctx.beginPath();
				ctx.fillStyle = this.colors[this.values[i-1]];
				ctx.fillRect(cw*(mod-1)/4+2,ch*(divide-1)/4+2,cw/4-2,ch/4-2);
				ctx.closePath();
				ctx.beginPath();
				ctx.fillStyle = '#333';
				ctx.font = 'bold 40px Arial';
				ctx.textAlign = 'center';
				ctx.fillText(this.values[i-1], (mod*60)+((mod-1)*60), (divide*60)+((divide-1)*60)+10);
				ctx.closePath();
			}else{
				ctx.beginPath();
				ctx.fillStyle = "#ddd";
				ctx.fillRect(cw*(mod-1)/4+2,ch*(divide-1)/4+2,cw/4-2,ch/4-2);
				ctx.closePath();
			}
		}
		document.getElementById("score").innerHTML = "Score : "+this.score;
	}
	randomNumber(max = 0, cur = 0){
		var random = Math.floor((Math.random()*max) + 1);
		if(random == cur){
			random = this.randomNumber(cur);
		}
		return random;
	}
	move(key){
		if(key == 39){//right
			if(this.isValidMove(key)){
				this.valids.forEach((value)=>{
					var prefix = (value-1)*4;
					var results = [];
					for(var i = 4; i >= 1; i--){
						var key = prefix+i-1;
						if(this.values[key] != 0){
							results.push(this.values[key]);
						}
					}
					results.forEach((value, index)=>{
						if(index < results.length-1 && value == results[index+1]){
							results[index] += results[index+1];
							this.score += results[index+1];
							results.splice(index+1, 1);
						}
					});
					results.reverse();
					var offset = 4 - results.length;
					for(var i = 1; i <= offset; i++){
						results.unshift(0);
					}
					results.forEach((value, index)=>{
						this.values[prefix+index] = value;
					});
				})
				this.generateRandom();
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}else if(key == 37){//left
			if(this.isValidMove(key)){
				this.valids.forEach((value)=>{
					var prefix = (value-1)*4;
					var results = [];
					for(var i = 1; i <= 4; i++){
						var key = prefix+i-1;
						if(this.values[key] != 0){
							results.push(this.values[key]);
						}
					}
					results.forEach((value, index)=>{
						if(index < results.length-1 && value == results[index+1]){
							results[index] += results[index+1];
							this.score += results[index+1];
							results.splice(index+1, 1);
						}
					});
					results.reverse();
					var offset = 4 - results.length;
					for(var i = 1; i <= offset; i++){
						results.unshift(0);
					}
					results.forEach((value, index)=>{
						this.values[prefix+3-index] = value;
					});
				})
				this.generateRandom();
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}else if(key == 38){//up
			if(this.isValidMove(key)){
				this.valids.forEach((value)=>{
					var results = [];
					for(var i = 1; i <= 4; i++){
						var key = 4*(i-1)+value-1;
						if(this.values[key] != 0){
							results.push(this.values[key]);
						}
					}
					results.forEach((value, index)=>{
						if(index < results.length-1 && value == results[index+1]){
							results[index] += results[index+1];
							this.score += results[index+1];
							results.splice(index+1,1);
						}
					})
					var offset = 4 - results.length;
					for(var i = 1; i <= offset; i++){
						results.push(0);
					}
					results.forEach((val, index)=>{
						this.values[4*(index)+value-1] = val;
					});
				});
				this.generateRandom();
				this.valids = [];
			}else{
				alert("Not Valid");
			}
		}else if(key == 40){//down
			if(this.isValidMove(key)){
				this.valids.forEach((value)=>{
					var results = [];
					for(var i = 4; i >= 1; i--){
						var key = 4*(i-1)+value-1;
						if(this.values[key] != 0){
							results.push(this.values[key]);
						}
					}
					results.forEach((value, index)=>{
						if(index < results.length-1 && value == results[index+1]){
							results[index] += results[index+1];
							this.score += results[index+1];
							results.splice(index+1,1);
						}
					})
					var offset = 4 - results.length;
					for(var i = 1; i <= offset; i++){
						results.push(0);
					}
					results.reverse();
					results.forEach((val, index)=>{
						this.values[4*(index)+value-1] = val;
					});
				});
				this.generateRandom();
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
				var prefix = 4*(i-1)+ii;
				if(key == 39 && ii < 4 && this.values[prefix-1] != 0 && (this.values[prefix] == 0 || this.values[prefix] == this.values[prefix-1])){
					if(!this.valids.includes(i)){
						this.valids.push(i);
						valid = true;
					}
				}else if(key == 37 && ii > 1 && this.values[prefix-1] != 0 && (this.values[prefix-2] == 0 || this.values[prefix-1] == this.values[prefix-2])){
					if(!this.valids.includes(i)){
						this.valids.push(i);
						valid = true;
					}
				}else if(key == 38 && i > 1 && this.values[prefix-1] != 0 && (this.values[prefix-5] == 0 || this.values[prefix-1] == this.values[prefix-5])){
					if(!this.valids.includes(ii)){
						this.valids.push(ii);
						valid = true;
					}
				}else if(key == 40 && i < 4 && this.values[prefix-1] != 0 && (this.values[prefix+3] == 0 || this.values[prefix-1] == this.values[prefix+3])){
					if(!this.valids.includes(ii)){
						this.valids.push(ii);
						valid = true;
					}
				}
			}
		}
		return valid;
	}
	moveNumber(src,dst){
		alert(src+"->"+dst);
		if(this.values[dst-1] == 0){
			this.values[dst-1] = this.values[src-1];
			this.values[src-1] = 0;
		}else{
			this.moveNumber(src, dst-1);
		}
	}
	generateRandom(){
		var empty = [];
		this.values.forEach((value, index)=>{
			if(value == 0){
				empty.push(index);
			}
		});

		if(empty.length > 0){
			var random = this.randomNumber(empty.length);
			this.values[empty[random-1]] = 2;
			this.draw();
		}
		if(!this.canMove()){
			alert("There is no possible move. Game Over");	
		}
	}
	canMove(){
		var can_move = false;
		for(var i = 1; i <=4; i++){
			for(var ii = 1; ii <= 4; ii++){
				var prefix = 4*(i-1)+ii;
				if(ii < 4 && this.values[prefix-1] != 0 && (this.values[prefix] == 0 || this.values[prefix] == this.values[prefix-1])){
					can_move = true;
				}else if(ii > 1 && this.values[prefix-1] != 0 && (this.values[prefix-2] == 0 || this.values[prefix-1] == this.values[prefix-2])){
					can_move = true;
				}else if(i > 1 && this.values[prefix-1] != 0 && (this.values[prefix-5] == 0 || this.values[prefix-1] == this.values[prefix-5])){
					can_move = true;
				}else if(i < 4 && this.values[prefix-1] != 0 && (this.values[prefix+3] == 0 || this.values[prefix-1] == this.values[prefix+3])){
					can_move = true;
				}
			}
		}
		return can_move;		
	}
}