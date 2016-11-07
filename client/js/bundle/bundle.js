(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** Game Loop Module
 * This module contains the game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 */
 function gameLoop (scope) {
 	var loop = this;

 	// Initialize timer variables so we can calculate FPS
 	var fps = scope.constants.targetFps, // Our target fps
 		fpsInterval = 100 / fps, // the interval between animation tick, in ms (1000 / 60 = ~16.666667)
 		before = window.performance.now(), // The starting times timestamp.

 		// Set up an object to contain our alternating FPS calculations
 		cycles = {
 			new: {
 				frameCount: 0, // Frames since the start of the cycle
 				startTime: before,
 				sinceStart: 0
 			},
 			old: {
 				frameCount: 0,
 				startTime: before,
 				sinceStart: 0
 			}
 		},

 		// alternating Frame Rate variables
 		resetInterval = 5, // Frame rate cycle reset interval (in seconds)
 		resetState = 'new'; // The initial frame rate cycle

 	loop.fps = 0; // A prop that will expose the current calculated FPS to other modules

 	// Main game rendering loop
 	loop.main = function mainLoop(tframe){
 		// Request a new animation frame
 		// Setting to 'stopLoop' so animation can be stopped via
 		// 'window.cancelAnimationFrame(loop.stopLoop)'
 		loop.stopLoop = window.requestAnimationFrame(loop.main);

 		// How long ago since last loop?
 		var now = tframe,
 			elapsed = now - before,
 			activeCycle, targetResetInterval;

 		// If it's been at least our desired interval, render
 		if (elapsed > fpsInterval) {
 			// Set before = now for next frame, also adjust for
        	// specified fpsInterval not being a multiple of rAF's interval (16.7ms)
        	// ( http://stackoverflow.com/a/19772220 )
        	before = now - (elapsed % fpsInterval);

        	// Increment the vals for both the active and the alternate FPS calculations
        	for(var calc in cycles) {
        		++cycles[calc].frameCount;
        		cycles[calc].sinceStart = now - cycles[calc].startTime;
        	}

        	// choose the correct FPS calculation, then update the exposed fps value
        	activeCycle = cycles[resetState];
        	loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

        	// If our frame counts are equal....
        	targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
        							? resetInterval * fps // Wait our interval
        							: (resetInterval * 2) * fps); // wait double our interval

        	// If the active calculation goes over our specified interval,
			// reset it to 0 and flag our alternate calculation to be active
			// for the next series of animations.

			if (activeCycle.frameCount > targetResetInterval) {
			    cycles[resetState].frameCount = 0;
			    cycles[resetState].startTime = now;
			    cycles[resetState].sinceStart = 0;

			    resetState = (resetState === 'new' ? 'old' : 'new');
			}

        	// Update the game state
	 		scope.state = scope.update(now);
	 		// Render the next frame
	 		scope.render();
 		}
 	};

 	// Start off main loop
 	loop.main();

 	return loop;
 }

 module.exports = gameLoop;
},{}],2:[function(require,module,exports){
/** Game Render Module
 * Called by the game loop, this module will
 * perform use the global state to re-render
 * the canvas using new data. Additionally,
 * it will call all game entities `render`
 * methods.
 */

 function gameRender(scope) {
 	// Setup globals
 	var w = scope.constants.width,
 		h = scope.constants.height;

 	return function render() {
 		// clear out the canvas

 		scope.ctx.clearRect(0, 0, w, h);

		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, w, h);

 		// if we want to show the FPS, then render it in the top right corner
 		if(scope.constants.showFps){
 			scope.ctx.fillStyle = '#ff0';
 			scope.ctx.font = '18px Arial';
 			scope.ctx.fillText('FPS: ' + scope.loop.fps, w - 120, 50);
 		}

 		// if there are entities iterate through them and call their 'render' methods.
 		 if(scope.state.hasOwnProperty('entities')) {
 			var entities = scope.state.entities;
 			//loop through entities
 			for(var entity in entities){
 			// fire off each active entities 'render' method
 			entities[entity].render();
 			}
 		}
 	}
 }

 module.exports = gameRender;
},{}],3:[function(require,module,exports){
/** Game Update Module
 * Called by the game loop, this module will
 * perform any state calculations / updates
 * to properly render the next frame.
 */

 function gameUpdate(scope) {
 	return function update(tFrame){
 		var state = scope.state || {};

 		//if there are entities, iterate through then and call their 'update' methods
 		if(state.hasOwnProperty('entities')) {
 			var entities = state.entities;
 			//loop through entities
 			for(var entity in entities){
 			// fire off each active entities 'render' method
 			entities[entity].update();
 			}
 		}
 		return state;
 	}
 }

 module.exports = gameUpdate;
},{}],4:[function(require,module,exports){

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


},{}],5:[function(require,module,exports){
var keys = require('../utils/utils.keys.js');

function Player(scope, side) {
	var player = this;

	this.side = side;
	this.style = side == "left" ? "red" : "blue";
	this.sizeWidth = 25,
	this.sizeLength = 140;

	player.state = {
		position: {
			x: side == "left" ? 100 : scope.constants.width-100,
			y: scope.constants.height / 2 - this.sizeLength / 2
		},
		moveSpeed: 10,
		sizeWidth: 25
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
},{"../utils/utils.keys.js":8}],6:[function(require,module,exports){
// Require modules
var gameLoop = require('./core/game.loop.js'),
    gameUpdate = require('./core/game.update.js'),
    gameRender = require('./core/game.render.js'),
    // Entities
    Player = require('./entities/player.js'),
    Ball = require('./entities/ball.js'),
	// Utilities
	//Keys = require('./utils/utils.keys.js'),
	cUtils = require('./utils/utils.canvas.js');

function Game(w, h, targetFps, showFps) {
	var self;

	//setup some constants
	this.constants = {
		width: w,
		height: h,
		targetFps: targetFps,
		showFps: showFps,
		winner: false
	};

	// Instantiate an empty state object
	this.state = {};

	this.canvas = cUtils.generateCanvas(w, h);
	this.ctx = this.canvas.getContext('2d');

	// Instantiate core modules with the current scope
	this.update = gameUpdate(this);
	this.render = gameRender(this);
	this.loop = gameLoop(this);

	self = this;

	// self envoking function.
	var createPlayers = function createPlayer() {
        self.state.entities = self.state.entities || {};
        self.state.entities.player1 = new Player(self,"left");
        self.state.entities.player2 = new Player(self,"right");
    }();

    var addBall = function addBall() {
        self.state.entities = self.state.entities || {};
        self.state.entities.ball = new Ball(self);
    }();

	return this;

}

// Instantiate the game in a global

window.game = new Game(window.innerWidth, window.innerHeight, 60, true);

module.exports = game;
},{"./core/game.loop.js":1,"./core/game.render.js":2,"./core/game.update.js":3,"./entities/ball.js":4,"./entities/player.js":5,"./utils/utils.canvas.js":7}],7:[function(require,module,exports){
module.exports = {

	getPixelRatio : function getPixelRatio(ctx) {
	  console.log('Determining pixel ratio.');

	  // I'd rather not have a giant var declaration block,
	  // so I'm storing the props in an array to dynamically
	  // get the backing ratio.
	  var backingStores = [
	    'webkitBackingStorePixelRatio',
	    'mozBackingStorePixelRatio',
	    'msBackingStorePixelRatio',
	    'oBackingStorePixelRatio',
	    'backingStorePixelRatio'
	  ];

	  var deviceRatio = window.devicePixelRatio;

	  // Iterate through our backing store props and determine the proper backing ratio.
	  var backingRatio = backingStores.reduce(function(prev, curr) {
	    return (ctx.hasOwnProperty(curr) ? ctx[curr] : 1);
	  });

	  // Return the proper pixel ratio by dividing the device ratio by the backing ratio
	  return deviceRatio / backingRatio;
	},

	generateCanvas : function generateCanvas(w, h) {
	  console.log('Generating canvas.');

	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext('2d');
	  // Pass our canvas' context to our getPixelRatio method
	  var ratio = this.getPixelRatio(ctx);

	  // Set the canvas' width then downscale via CSS
	  canvas.width = Math.round(w * ratio);
	  canvas.height = Math.round(h * ratio);
	  canvas.style.width = w +'px';
	  canvas.style.height = h +'px';
	  // Scale the context so we get accurate pixel density
	  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

	  return canvas;
	}
};
},{}],8:[function(require,module,exports){
/** keysDown Utility Module
 * Monitors and determines whether a key
 * is pressed down at any given moment.
 * Returns getters for each key.
 */

function Keys() {

    this.isPressed = {};

    var playerKeys = {
        p1: {
            up: false,
            down: false
        },
        p2: {
            up: false,
            down: false
        }
    };

     // Set up `onkeyup` event handler.
    document.onkeyup = function (ev) {
        if (ev.which === 87) { playerKeys.p1.up = false; }
        if (ev.which === 83) { playerKeys.p1.down = false; }
        if (ev.which === 38) { playerKeys.p2.up = false; }
        if (ev.which === 40) { playerKeys.p2.down = false; }
    };

    // Set up `onkeydown` event handler.
    document.onkeydown = function (ev) {
        if (ev.which === 87) { playerKeys.p1.up = true; }
        if (ev.which === 83) { playerKeys.p1.down = true; }
        if (ev.which === 38) { playerKeys.p2.up = true; }
        if (ev.which === 40) { playerKeys.p2.down = true; }
    };

    Object.defineProperty(this.isPressed, 'playerKeys', {
        get: function() {return playerKeys; },
        configurable: true,
        enumerable: true
    });

    return this;
}

module.exports = Keys();
},{}]},{},[6]);
