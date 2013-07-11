define(['backbone', './templates', 'models/game-model', 'models/user-model'], function (Backbone, Templates, Game, User) {
  var PageView = Backbone.View.extend({

    events: {
      'click .js-new-game': 'createNewGame',
      'click .js-regist-user': 'registUser'
    },


    createNewGame: function () {
      var game = new Game();
      this.options.game_collection.create(game);
    },

    registUser: function(){
      var user = new User();
      user.set({ name: user.$el.find('input').val() });
      console.log(user);
      this.options.user_collection.create(user);
    }
  });

  return PageView;
});
