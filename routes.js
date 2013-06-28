var controllers = require('./controllers');

exports.route = function (app) {
  app.get('/', controllers.main.index);
  app.post('/games', controllers.main.createGame);
};
