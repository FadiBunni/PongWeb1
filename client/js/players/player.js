// /js/players/player.js

/** Player Module
 * Main player entity module.
 */
function Player(scope, x, y) {
	var player = this;

	//Create the initial state
	player.state ={
		position: {
			x: x,
			y: y
		},
		moveSpeed: 1.5
	};

	//Set up any other constants
	var height = 23,
		width = 16;

	// Draw the player on the canvas
	player.render = function playerRender(){
		scope.ctx.fillStyle = '#40d870';
		scope.ctx.fillRect(
			player.state.position.x,
			player.state.position.y,
			width,height
		);
	};

	//Fired via the global update method.
	//Mutates state as needed for proper rendering next state
	player.update = function playerUpdate(){

	};
	return player;
}