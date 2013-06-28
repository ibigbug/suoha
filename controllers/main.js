var card = require('../models/card');

exports.index = function (req, res) {
  res.render('index.jade', {cards_remaining: generateCards()}, function (err, html) {
    res.send(html);
  });
};

function generateCards () {
  var ret = [];
  for (var type in card.TYPES) {
    for (var point in card.POINTS) {
      ret.push(new card.Card(type, point));
    }
  }

  return ret;
}
