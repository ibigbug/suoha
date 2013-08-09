var db =require('../config').db,
    ObjectID = db.ObjectID,
    User = require('../models/user').User,
    USER_STATUS_TABLE = require('../models/user').USER_STATUS_TABLE;


exports.register = function(req, res){
  db.collection('users').save(new User(ObjectID().valueOf(), req.param('name')), function(err, user){
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

exports.allUsers = function(req, res){
  db.collection('users').find().toArray(function(err, users){
    res.json(users);
  });
};

exports.heartbeat = function(req, res){
  var context = this;
  db.collection('users').update({_id: ObjectID(req.param('id'))}, { $set: { last_time: Date.now() }}, {safe: true}, function(err, result){
    console.log(result);
    err ? res.send(500) : 
      result ? 
        res.json({stat:'ok',data:{outdate:true}}) :
        res.json({stat:'ok',data:{outdate:false}});
  });

  typeof context.cleaner == 'function' ?
    console.log('cleaning') :
    (function(context){
      context.cleaner = function(){
        var now = Date.now();
        db.collection('users').update({status: USER_STATUS_TABLE.ONLINE, last_time: { $lt: now - 9000}}, { $set: { status: USER_STATUS_TABLE.OFFLINE }}, {safe: true}, function(err){
          err ? console.log(err) : res.send(200);
        });
        setTimeout(context.cleaner, 10000);
      }
      context.cleaner();
    })(context);
};
