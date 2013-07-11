var Card = require('../models/card'),
    db = require('../config').db;

var GAME_STATUS = {
  'WAITNG': 0,
  'PLAYING': 1,
  'OVER': 2
};

function Game (count) {
 var now = Date.now();

 this.status = GAME_STATUS.WAITNG;
 this.users = [];
 this.cards = generateCards(count);
}

exports.Game = Game;
exports.GAME_STATUS = GAME_STATUS;


/*=== Helpers ===*/
function generateCards (count /* how many set of cards*/) {
  var ret = [];
  for (var type in Card.TYPES) {
    for (var point in Card.POINTS) {
      ret.push(new Card.Card(type, point));
    }
  }

  for (var i = 0; i < count ; i++) ret.concat(ret);

  return ret;
}
