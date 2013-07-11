var db =require('../config').db,
    User = require('../models/user').User,
    USER_STATUS_TABLE = require('../models/user').USER_STATUS_TABLE;


exports.register = function(req, res){
  db.collection('users').save(new User(req.param('name')), function(err, user){
    console.log(user);
    res.json(user);
  });
};

exports.login = function(req, res){
  req.param('name') ? 
    (
      db.collection('users').find({ name: req.param('name')}).toArray(function(err, user){
        if (!user.length) {
          res.clearCookie();
          res.send('Login Error');
        } else {
          db.collection('users').findAndModify({_id: user[0]._id}, [['_id', 'asc']],{ $set: { status: USER_STATUS_TABLE.ONLINE }}, {}, function(err, user){
            res.cookie('name', user.name, { signed: true });
            res.json(user);
          });
        }
      })
    ) : res.send(400);
};

exports.logout = function(req, res){
  db.collection('users').update({_id: req.param('id') }, { $set: { status: USER_STATUS_TABLE.OFFLINE }}, function(err, result){
    if(err){console.log(err);}
    console.log(result);
    res.send('bye');
  });
};

exports.allUsers = function(req, res){
  db.collection('users').find().toArray(function(err, users){
    res.json(users);
  });
};
