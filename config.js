var mongo = require('mongoskin');

var db = mongo.db('localhost:27017/soha?auto_reconnect', {w: 1});

exports.db = db;
