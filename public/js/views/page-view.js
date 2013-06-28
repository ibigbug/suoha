define(['backbone', 'underscore', './templates', 'models/game-model'], function (Backbone, _, Templates, Game) {
  var PageView = Backbone.View.extend({

    events: {
      'click .js-new-game': 'createNewGame'
    },



    createNewGame: function () {
      var game = new Game();
      this.options.game_collection.add(game);
    }
  });

  return PageView;
});
