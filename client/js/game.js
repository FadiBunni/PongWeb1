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
<<<<<<< HEAD
    }();

    var addBall = function addBall() {
        self.state.entities = self.state.entities || {};
        self.state.entities.ball = new Ball(self);
=======
>>>>>>> 387050286f75a30e5b6ccc02f2e0339975bfb616
    }();

	return this;

}

// Instantiate the game in a global

window.game = new Game(window.innerWidth, window.innerHeight, 60, true);

module.exports = game;