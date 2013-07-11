define(['collections/game-clct', 'collections/user-clct', 'views/page-view'], function(GameCollection, UserCollection, PageView){

  return {
    config: {
      login_url: '/account/login'
    },
    GameCollection: GameCollection,
    UserCollection: UserCollection,
    PageView: PageView
  };

});
