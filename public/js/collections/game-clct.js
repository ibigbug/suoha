define(['backbone', 'models/game-model'], function (Backbone, Game) {
  var GameCollection =  Backbone.Collection.extend({

    model: Game,

    url: '/games'

  });

  return GameCollection;
});
