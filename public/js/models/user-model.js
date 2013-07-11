define(['backbone', 'underscore', 'views/templates'], function (Backbone, _, templates) {
  var User = Backbone.Model.extend({
    el: $('.online-user-list'),
    tpl: _.template(templates.user_item_tpl),

    initialize: function(){
      this.$el = this.el;

      this.bind('add', function(model){
        this.render();
      });
    },

    render: function(){
      console.log(this.toJSON());
    }
  });
});
