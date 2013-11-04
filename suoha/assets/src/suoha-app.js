define(function (require, exports, module) {
  var User = require('./user');
  var Game = require('./game');

  var angular = require('angular');
  var _ = require('underscore');
  var suohaApp = angular.module('suohaApp', []);

  suohaApp.controller('gameController', ['$scope', function ($scope) {
    $scope.game = new Game();
    $scope.startGame = function () {
      $scope.game.setUser(getUsers($scope.game.players));
      $scope.game.start();

      $scope.sendCard();
    };

    $scope.sendCard = function () {
      _.each($scope.game.users, function (user) {
        user.cards.push($scope.game.cards.pop());
      });
    };

    $scope.resetGame = function () {
      $scope.game = new Game();
    };
  }]);

  module.exports = suohaApp;

  function getUsers(num) {
    var ret = [];
    for (var i = 0; i < num; i++) {
      ret.push(new User());
    }

    return ret;
  }
});
