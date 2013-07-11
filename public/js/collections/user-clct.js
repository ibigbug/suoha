define(['backbone', 'models/user-model'], function(Backbone, User){
  var UserCollection = Backbone.Collection.extend({

    model: User,

    url: '/users'

  });

  return UserCollection;
});
