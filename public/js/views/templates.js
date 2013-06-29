define(function(){
  var game_item_tpl = [
   '<li>',
   '<a href="#<%= id%>">',
   '<%= id%>',
   '</a>',
   '</li>'
  ].join('');

  return {
    game_item_tpl: game_item_tpl
  };
});
