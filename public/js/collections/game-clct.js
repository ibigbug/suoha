define(['backbone', 'models/game-model'], function (Backbone, Game) {
  var GameCollections =  Backbone.Collection.extend({

    model: Game,

    url: '/games',

  });

  return GameCollections;
});
