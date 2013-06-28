var Card = require('../models/card'),
    Game = require('../models/game').Game;

exports.index = function (req, res) {
  var game = new Game();
  game.cards = generateCards();
  game.start();

  res.render('index.jade', {game: game}, function (err, html) {
    res.send(html);
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
