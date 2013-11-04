define(function (require) {
  var _ = require('underscore');

  function Game() {
    this.started = false;
    
    this.mode = 'single';
    this.players = 1;

    this.cards = [];
    this.users = [];
  }

  Game.prototype.start = function () {
    this.started = true;
    this.cards = _getCards(this.set);
  };
  Game.prototype.setUser = function (users) {
    this.users = users;
  };

  Game.prototype.calcResult = function () {
    _.each(this.users, function (user) {
      
    });
  };

  function _getCards(set) {
    set = set || this.set;
    var CARD_TYPES = {
      'spade': 3,
      'heart': 2,
      'club': 1,
      'diamond': 0
    };

    var CARD_POINTS = {
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
    var temp = [], ret = [];

    for (var type in CARD_TYPES) {
      for (var point in CARD_POINTS) {
        temp.push({type: type, point: point});
      }
    }

    for (var i = 0; i < parseInt(set, 10); i++)
      ret = ret.concat(temp);

    return _.shuffle(ret);
  }

  return Game;


  // detect card score
  function _detectCards(cards) {
    var count = {};
    var orderMap = {
      'royal flush': 9,
      'straight flush': 8,
      'four of kind': 7,
      'fullhouse': 6,
      'flush': 5,
      'straight': 4,
      'three of a kind': 3,
      'two pairs': 2,
      'one pair': 1,
      'zilch': 0
    };

    _.forEach(cards, function (card) {
      if (count.hasOwnProperty(card.type)) {
        count[card.type] += 1;
      } else {
        count[card.type] = 0;
      }
    });

    
  }
});
