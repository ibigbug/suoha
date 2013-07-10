define(function(){
  var game_item_tpl = [
   '<li>',
   '<a href="#<%= id%>">',
   '<%= id%>',
   '</a>',
   '</li>'
  ].join(''),

  user_item_tpl = [
   '<li>',
   '<a href="#<%= id%>">',
   '<%= id%>',
   '</a>',
   '</li>'
  ];

  return {
    game_item_tpl: game_item_tpl
  };
});
