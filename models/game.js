var db = require('../config').db;

var GAME_STATUS = {
  'WATING': 0,
  'PLAYING': 1,
  'OVER': 2
};

function Game () {
 var now = Date.now();

 this.id = db.ObjectID(now);
 this.status = GAME_STATUS.WATING;
 this.users = [];
 this.cards = [];
}

exports.Game = Game;
