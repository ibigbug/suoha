var db =require('../config').db,
    ObjectID = require('mongodb').ObjectID,
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
  db.collection('users').update({_id: ObjectID(req.param('id')) }, { $set: { status: USER_STATUS_TABLE.OFFLINE }}, {safe:true}, function(err, result){
    if(err){console.log(err);}
    res.send('bye');
  });
};

exports.allUsers = function(req, res){
  db.collection('users').find().toArray(function(err, users){
    res.json(users);
  });
};

exports.heartbeat = function(req, res){
  var context = this;
  db.collection('users').update({_id: ObjectID(req.param('id'))}, { $set: { last_time: Date.now() }}, {safe: true}, function(err, result){
    err ? console.log(err) : res.send(200);
  });

  typeof context.cleaner == 'function' ?
    console.log('cleaning') :
    (function(context){
      context.cleaner = function(){
        var now = Date.now();
        console.log(now);
        db.collection('users').findAndModify({status: USER_STATUS_TABLE.ONLINE, last_time: { $lt: now - 8000}}, [['last_time', 'asc']], { $set: { status: USER_STATUS_TABLE.OFFLINE }}, {}, function(err, result){
          console.log(result);
        });
        setTimeout(context.cleaner, 10000);
      }
      context.cleaner();
    })(context);
};
