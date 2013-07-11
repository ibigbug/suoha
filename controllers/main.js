var Game = require('../models/game').Game,
    GAME_STATUS = require('../models/game').GAME_STATUS,
    db = require('../config').db;


//Html render

exports.index = function (req, res) {
  res.render('index.jade');
};


//API
exports.waitingGame = function (req, res) {
  var collection = db.collection('games');
  collection.find({status: GAME_STATUS.WAITNG}).toArray(function (err, games) {
    res.json(games);
  });
};

exports.createGame = function (req, res) {
  var game = new Game();
  db.collection('games').save(game, function (err, game) {
    res.send(game);
  });
};

