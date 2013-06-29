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
    var game_collection = new game.GameCollection(),
        page_view = new game.PageView({
          el: $('#main'),
          game_collection: game_collection
        });
    game_collection.fetch();
  });
});
