define(['backbone', 'jquery', '../settings', './templates', 'models/game-model', 'models/user-model'], function (Backbone, $, settings, Templates, Game, User) {
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
      var that = this;
      $.ajax({
        url: settings.login_url,
        dataType: 'json',
        type: 'POST',
        data: {name: $('.login-username').val()}
      }).done(function(user){
        that.options.user_collection.add(user);
        NS.user = user;
        that.startHeartBeat();
        alert('Login Success');
      }).fail(function(resp){
        alert('Login Error');
      });
    },

    startHeartBeat: function(){
      var that = this;

      if (!NS.user) return;
      if (NS.heartRate) return;
      NS.heartRate = setInterval(function(){
        $.ajax({
          url: '/account/heartbeat',
          data: {id: NS.user._id},
          type: 'POST'
        }).done(function(json){
          json.stat == 'ok' && json.data.outdate && that.options.user_collection.fetch();
        }).fail(function(){
          alert('offline');
        });
      }, 3000);
    }
  });

  return PageView;
});
