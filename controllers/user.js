var db =require('../config').db,
    User = require('../models/user').User;


exports.register = function(req, res){
  db.collection('users').save(new User(), function(err, user){
    res.json(user);
  });
};

exports.allUsers = function(req, res){
  db.collection('users').find({}).toArray(function(err, users){
    res.json(users);
  });
};
