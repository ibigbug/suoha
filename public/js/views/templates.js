define(function(){
  var game_item_tpl = [
   '<li>',
   '<a href="#game/<%= _id%>">',
   '<%= _id%>',
   '</a>',
   '</li>'
  ].join(''),

  user_item_tpl = [
   '<li>',
   '<a href="#user/<%= _id%>">',
   '<%= name%>(<%= status%>)',
   '</a>',
   '</li>'
  ].join('');

  return {
    game_item_tpl: game_item_tpl,
    user_item_tpl: user_item_tpl
  };
});
