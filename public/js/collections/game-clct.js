define(['backbone', 'models/game-model'], function (Backbone, Game) {
  var GameCollections =  Backbone.Collection.extend({
    model: Game,
    url: '/games',

    initialize: function () {
      this.bind('add', this.onGameCreate, this);
    },

    onGameCreate: function (model, collection, options) {
      model.save();
    }
  });

  return GameCollections;
});
