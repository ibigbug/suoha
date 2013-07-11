define(['backbone', 'underscore', 'views/templates'], function (Backbone, _, templates) {
  var User = Backbone.Model.extend({
    defaults: {
      name: null
    },

    el: $('.user-container'),
    tpl: _.template(templates.user_item_tpl),
    url: '/users',

    initialize: function(){
      this.$el = this.el;

      this.bind('add', function(model){
        this.render();
      });
    },

    render: function(){

      var $el = this.$el.find('.online-user-list');
      var online_user_count = $el.data('online-user-count');
      parseInt(online_user_count, 10) === 0 && $el.html('') && $el.removeAttr('data-online-user-count');

      $el.append(this.tpl(this.toJSON()));
      $el.data('online-user-count', online_user_count + 1);
    }
  });

  return User;
});
