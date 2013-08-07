define(['backbone', 'socketio', 'jquery', '../settings', './templates', 'models/game-model', 'models/user-model'], function (Backbone, socketio, $, settings, Templates, Game, User) {
  var io = socketio.connect('http://127.0.0.1:3000');
  var PageView = Backbone.View.extend({
    initialize: function(){
      window.NS = {};
    },

    events: {
      'click .js-new-game': 'createNewGame',
      'click .js-regist-user': 'registUser',
      'click .js-login-user': 'loginUser'
    },


    createNewGame: function () {
      var that = this;
      var game = new Game();
      game.save({}, {success: function(model, game){
        that.options.game_collection.add(game);
      }});
    },

    registUser: function(){
      var that = this;
      var user = new User();
      user.save({ name: user.$el.find('input[name="username"]').val() }, {success: function(model, user){
        alert('Register successfully');
      }});
    },

    loginUser: function(){
      io.emit('login', {name: $('.login-username').val()}, function(user){
        window.NS.user = user;
        alert('Login success');
      });
    }

  });

  return PageView;
});
