require.config({
  paths: {
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
    }

  }
});

require(['jquery', 'app'], function ($, game) {

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

  });
});
