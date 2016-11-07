/** keysDown Utility Module
 * Monitors and determines whether a key
 * is pressed down at any given moment.
 * Returns getters for each key.
 */

function Keys() {

<<<<<<< HEAD
    this.isPressed = {};

    var playerKeys = {
=======
    var key = {
>>>>>>> 387050286f75a30e5b6ccc02f2e0339975bfb616
        p1: {
            up: false,
            down: false
        },
        p2: {
            up: false,
            down: false
        }
    };

<<<<<<< HEAD
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
=======
     // Set up `keyup` event handler.
    function keyUp (ev) {
        switch(ev.which){
            // player 1 UP
            case 87:
                key.p1.up = false;
            break;
            // player 1 DOWN
            case 83:
                key.p1.down = false;
            break;
            // player 2 UP
            case 38:
                key.p2.up = false;
            break;
            // player 2 DOWN
            case 40:
                key.p2.down = false;
            break;
        }
    }

    // Set up `keydown` event handler.
    function keyDown (ev) {
        switch(ev.which){
            // player 1 UP
            case 87:
                key.p1.up = true;
            break;
            // player 1 DOWN
            case 83:
                key.p1.down = true;
            break;
            // player 2 UP
            case 38:
                key.p2.up = true;
            break;
            // player 2 DOWN
            case 40:
                key.p2.down = true;
            break;
        }
    }
>>>>>>> 387050286f75a30e5b6ccc02f2e0339975bfb616

    return this;
}

module.exports = Keys();