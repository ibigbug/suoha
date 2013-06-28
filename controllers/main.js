var Card = require('../models/card'),
    Game = require('../models/game').Game,
    db = require('../config').db;

exports.index = function (req, res) {
  db.collection('games', function (err) {
  });
};

exports.createGame = function (req, res) {
  var game = new Game();
  db.collection('games').save(game, function (err, game) {
    res.send(game);
  });
};

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
