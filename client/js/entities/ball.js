
function Ball(scope) {
	var ball = this;
	var collision = false;

	this.style = "green";
	this.size = 10;

	ball.state = {
		position: {
			x: scope.constants.width / 2,
			y: scope.constants.height / 2
		},
		velocity: {
			velx: -5,
			vely: -5
		}
	};

	ball.render = function ballRender(){
		scope.ctx.beginPath();
		scope.ctx.fillStyle = this.style;
		scope.ctx.arc(ball.state.position.x, ball.state.position.y, this.size, 0, Math.PI * 2);
		scope.ctx.fill();
	}

	console.log(collision);

	ball.update = function ballUpdate(){
		if(ball.state.position.x < 0) {
			winner = 2;
		} else if(ball.state.position.x > scope.constants.width - this.size) {
			winner = 1;
		} else {

			if(ball.state.position.y < 0){
				ball.state.position.y = 0;
				ball.state.velocity.vely *= -1;
			}

			if(ball.state.position.y > scope.constants.height - this.size) {
				ball.state.position.y = scope.constants.height - this.size;
				ball.state.velocity.vely *= -1;
			}



			if(ball.state.position.x > scope.state.entities.player1.state.position.x && ball.state.position.x < scope.state.entities.player1.state.position.x + scope.state.entities.player1.state.sizeWidth){
				if(ball.state.position.y > scope.state.entities.player1.state.position.y && ball.state.position.y < scope.state.entities.player1.state.position.y + scope.state.entities.player1.state.sizeWidth) {
					ball.state.velocity.velx *= -1;
					collision = true;
				}
			}
			if(ball.state.position.x > scope.state.entities.player2.state.position.x && ball.state.position.x < scope.state.entities.player2.state.position.x + scope.state.entities.player2.state.sizeWidth){
				if(ball.state.position.y > scope.state.entities.player2.state.position.y && ball.state.position.y < scope.state.entities.player2.state.position.y + scope.state.entities.player2.state.sizeWidth) {
					ball.state.velocity.velx *= -1;
					collision = true;
				}
			}
			ball.state.position.x += ball.state.velocity.velx;
			ball.state.position.y += ball.state.velocity.vely;
			
		}

	}
	// function ranInt (Min, Max) {
	// return Math.floor(Math.random() * (Max-Min+1) + Min);
	// }

	return ball;
}

module.exports = Ball;

