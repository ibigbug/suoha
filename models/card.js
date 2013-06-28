var TYPES = {
  'spade': 0,
  'heart': 1,
  'club': 2,
  'diamond': 3
};

var POINTS = {
  'A': 14,
  'KING': 13,
  'QUEEN': 12,
  'JACK': 11,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
};

function Card(type, point) {
  this.type = TYPES[type];
  this.point = POINTS[point];
  this.name = type + point;
}

Card.prototype.toString = function () {
  return '<Card: ' + this.name + '>';
};

exports.Card = Card;
exports.TYPES = TYPES;
exports.POINTS = POINTS;
