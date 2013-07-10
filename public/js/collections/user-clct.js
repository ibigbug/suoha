define(['backbone', 'models/user-model'], function(Backbone, user){
  var UserCollection = Backbone.Collection.extend({

    model: User,

    url: '/users/'

  });

  return UserCollection;
});
