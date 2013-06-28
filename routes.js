var controllers = require('./controllers');

exports.route = function (app) {
  app.get('/', controllers.main.index);
};
