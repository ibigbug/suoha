var controllers = require('./controllers');

exports.route = function (app) {
  app.get('/', controllers.main.index);
  app.get('/games', controllers.main.waitingGame);
  app.post('/games', controllers.main.createGame);

  app.get('/users', controllers.user.allUsers);
  app.post('/users', controllers.user.register);

  app.post('/account/login', controllers.user.login);
  app.post('/account/heartbeat', controllers.user.heartbeat);
};
