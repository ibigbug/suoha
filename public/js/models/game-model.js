define(['backbone', 'underscore', 'views/templates'], function (Backbone, _, templates) {
  var Game = Backbone.Model.extend({
    el: $('.game-waiting-list'),
    tpl: _.template(templates.game_item_tpl),

    initialize: function () {
      this.$el = this.el;

      this.bind('add', function (model) {
        this.render();
      });
    },

    render: function () {
      var waiting_count = this.$el.data('game-waiting-count');
      parseInt(waiting_count, 10) == 0 && this.$el.html('') && this.$el.removeAttr('data-game-waiting-count');

      this.$el.append(this.tpl(this.toJSON()));
      this.$el.data('game-waiting-count', waiting_count + 1);
    }
  });

  return Game;
});
