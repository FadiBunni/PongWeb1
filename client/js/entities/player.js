var Keys = require('../utils/utils.keys.js');

function Player(scope, side) {
<<<<<<< HEAD
	var player = this;
=======
	keys = new Keys();
>>>>>>> 387050286f75a30e5b6ccc02f2e0339975bfb616

	this.side = side;
	this.style = side == "left" ? "red" : "blue";
	this.sizeWidth = 25,
	this.sizeLength = 140;

	player.state = {
		position: {
			x: side == "left" ? 100 : scope.constants.width-100,
			y: scope.constants.height / 2 - this.sizeLength / 2
		},
		moveSpeed: 10
	};


	player.render = function playerRender() {
		scope.ctx.fillStyle = this.style;
		scope.ctx.fillRect(player.state.position.x, player.state.position.y, this.sizeWidth, this.sizeLength);
	};



	player.update = function playerUpdate() {
		if(player.side == "left") {
			if(keys.isPressed.playerKeys.p1.down){
				player.state.position.y += player.state.moveSpeed;
			}
			if(keys.isPressed.playerKeys.p1.up){
				player.state.position.y -= player.state.moveSpeed;
			}
		} else {
			if(keys.isPressed.playerKeys.p2.down){
				player.state.position.y += player.state.moveSpeed;
			}
			if(keys.isPressed.playerKeys.p2.up){
				player.state.position.y -= player.state.moveSpeed;

	this.update = function playerUpdate() {
		if(this.side == "left") {
			if(keys.key.p1.down){
				this.y += this.speed;
			}
			if(keys.key.p1.up){
				this.y -= this.speed;
			}
		} else {
			if(keys.key.p2.down){
				this.y += this.speed;
			}
			if(keys.key.p2.up){
				this.y -= this.speed;
			}
		}

		// paddle stops at inner canvas.
		if(player.state.position.y < 0) {
			player.state.position.y = 0;
		} else if(player.state.position.y > scope.constants.height  - this.sizeLength){
			player.state.position.y = scope.constants.height  - this.sizeLength;
		}
	};

	return player;
}

module.exports = Player;