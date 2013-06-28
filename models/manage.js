var db = require('../config').db;

void function(){
  db.createCollection('games', function(){});
  db.createCollection('users', function(){});
}();
