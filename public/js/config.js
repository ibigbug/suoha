require.config({
  paths: {
    socketio: '/socket.io/socket.io',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
  },

  shim: {

    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    'underscore': {
      exports: '_'
    },

    'jquery': {
      exports: '$'
    },

    'socketio': {
      exports: 'io'
    }

  }
});

require(['jquery', 'app', 'socketio'], function ($, game, io) {

  $(function(){
    // Init game

    var game_collection = new game.GameCollection(),
        user_collection = new game.UserCollection(),

        page_view = new game.PageView({
          el: $('#main'),
          game_collection: game_collection,
          user_collection: user_collection
        });

    //Fetch data
    game_collection.fetch();
    user_collection.fetch();

    // start socket io
    var socket = io.connect('http://127.0.0.1:3000');
    socket.on('refresh', function(){
      user_collection.fetch();
    });

    $(window).on('beforeunload', function(e){
      if(window.NS.user){
        socket.emit('logout', {id:window.NS.user.id});
        var ret = 'R u sure?!';
        (e || window.event).returnValue = ret; 
        return ret;
      }
    });

  });
});
