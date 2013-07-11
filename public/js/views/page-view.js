define(['backbone', 'jquery', '../settings', './templates', 'models/game-model', 'models/user-model'], function (Backbone, $, settings, Templates, Game, User) {
  var PageView = Backbone.View.extend({
    initialize: function(){
      window.NS = {};
      var that = this;
      $(window).on('beforeunload', function(e){
        that.logoutUser();
        var confirmationMsg = 'ttt';

        (e || window.event).returnValue = confirmationMsg;
        return confirmationMsg;
      });
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
        that.options.game_collection.create(game);
      }});
    },

    registUser: function(){
      var that = this;
      var user = new User();
      user.save({ name: user.$el.find('input[name="username"]').val() }, {success: function(model, user){
        that.options.user_collection.add(user);
      }});
    },

    loginUser: function(){
      $.ajax({
        url: settings.login_url,
        dataType: 'json',
        type: 'POST',
        data: {name: $('.login-username').val()}
      }).done(function(user){
        NS.user = user;
        alert('Login Success');
      }).fail(function(resp){
        alert('Login Error');
      });
    },

    logoutUser: function(){
      $.ajax({
        url: '/account/logout',
        data: {id: NS.user._id},
        type: 'POST'
      });
    }
  });

  return PageView;
});
