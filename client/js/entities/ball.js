
function Ball(scope) {
	var ball = this;

	this.style = "green";
	this.size = 10;

	ball.state = {
		position: {
			x: scope.constants.width / 2,
			y: scope.constants.height / 2
		},
		velocity: {
			velx: 5,
			vely: 5
		}
	};

	ball.render = function ballRender(){
		scope.ctx.beginPath();
		scope.ctx.fillStyle = this.style;
		scope.ctx.arc(ball.state.position.x, ball.state.position.y, this.size, 0, Math.PI * 2);
		scope.ctx.fill();
	}

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

			// var p1 = players[0];
			// var p2 = players[1];

			// if(this.x > p1.x && this.x < p1.x + p1.sizeWidth)
			// 	if(this.y > p1.y && this.y < p1.y + p1.sizeLength) {
			// 		this.velx *= -1;
			// 		score[1] += scoreInc;
			// 	}
			// if(this.x > p2.x && this.x < p2.x + p2.sizeWidth)
			// 	if(this.y > p2.y && this.y < p2.y + p2.sizeLength) {
			// 		this.velx *= -1;
			// 		score[0] += scoreInc;
			// 	}
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

