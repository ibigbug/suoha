var mongo = require('mongoskin'),
    db = mongo.db('localhost:27017/soha?auto_reconnect', {w: 1});
var EE = require('events').EventEmitter;

exports.db = db;
exports.EventCenter = new EE();
