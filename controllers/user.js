var db =require('../config').db,
    User = require('../models/user').User,
    USER_STATUS_TABLE = require('../models/user').USER_STATUS_TABLE;


exports.register = function(req, res){
  db.collection('users').save(new User(req.param('name')), function(err, user){
    res.json(user);
  });
};

exports.login = function(req, res){
  db.collection('users').find({ name: req.param('name')}).toArray(function(err, user){
    if (!user.length) {
      res.clearCookie();
      res.send('Login Error');
    } else {
      db.collection('users').findAndModify({_id: user[0]._id}, [['_id', 'asc']],{ $set: { status: USER_STATUS_TABLE.ONLINE }}, { new: true }, function(err, user){
        res.cookie('name', user.name, { signed: true });
        res.json(user);
      });
    }
  });
};

exports.allUsers = function(req, res){
  db.collection('users').find().toArray(function(err, users){
    res.json(users);
  });
};
