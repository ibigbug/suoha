var db = require('../config').db;

function Game () {
 var now = Date.now();

 this.id = db.ObjectID(now);
 this.finished = false;
 this.users = [];
 this.cards = [];
}

Game.prototype.start = function () {
  db.collection('games').insert(this);
}

exports.Game = Game;
