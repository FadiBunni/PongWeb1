var keys = require('../utils/utils.keys.js');

function Player(scope, side) {
	var player = this;

	this.side = side;
	this.style = side == "left" ? "red" : "blue";
	this.sizeLength = 140;

	player.state = {
		moveSpeed: 10,
		sizeWidth: 25,
		sizeLength: 140,
		position: {
			x: side == "left" ? 100 : scope.constants.width-100,
			y: scope.constants.height / 2 - this.sizeLength  / 2
		}
	};

	player.render = function playerRender() {
		scope.ctx.fillStyle = this.style;
		scope.ctx.fillRect(player.state.position.x, player.state.position.y, player.state.sizeWidth, player.state.sizeLength);
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
			}
		}

		// paddle stops at inner canvas.
		if(player.state.position.y < 0) {
			player.state.position.y = 0;
		} else if(player.state.position.y > scope.constants.height  - player.state.sizeLength){
			player.state.position.y = scope.constants.height  - player.state.sizeLength;
		}
	};

	return player;
}

module.exports = Player;