define("ibigbug/suoha-app/1.0.0/suoha-app-debug", [ "./user-debug", "./game-debug", "gallery/underscore/1.4.4/underscore-debug.js", "angular/angularjs/1.1.5/angular-debug.js" ], function(require, exports, module) {
    var User = require("./user-debug");
    var Game = require("./game-debug");
    var angular = require("angular/angularjs/1.1.5/angular-debug.js");
    var _ = require("gallery/underscore/1.4.4/underscore-debug.js");
    var suohaApp = angular.module("suohaApp", []);
    suohaApp.controller("gameController", [ "$scope", function($scope) {
        $scope.game = new Game();
        $scope.startGame = function() {
            $scope.game.setUser(getUsers($scope.game.players));
            $scope.game.start();
            $scope.sendCard();
        };
        $scope.sendCard = function() {
            _.each($scope.game.users, function(user) {
                user.cards.push($scope.game.cards.pop());
            });
        };
        $scope.resetGame = function() {
            $scope.game = new Game();
        };
    } ]);
    module.exports = suohaApp;
    function getUsers(num) {
        var ret = [];
        for (var i = 0; i < num; i++) {
            ret.push(new User());
        }
        return ret;
    }
});

define("ibigbug/suoha-app/1.0.0/user-debug", [], function() {
    function User() {
        this.cards = [];
    }
    return User;
});

define("ibigbug/suoha-app/1.0.0/game-debug", [ "gallery/underscore/1.4.4/underscore-debug.js" ], function(require) {
    var _ = require("gallery/underscore/1.4.4/underscore-debug.js");
    function Game() {
        this.started = false;
        this.mode = "single";
        this.players = 1;
        this.set = 1;
        this.cards = [];
        this.users = [];
    }
    Game.prototype.start = function() {
        this.started = true;
        this.cards = _getCards(this.set);
    };
    Game.prototype.setUser = function(users) {
        this.users = users;
    };
    function _getCards(set) {
        set = set || this.set;
        var CARD_TYPES = {
            spade: 0,
            heart: 1,
            club: 2,
            diamond: 3
        };
        var CARD_POINTS = {
            A: 14,
            KING: 13,
            QUEEN: 12,
            JACK: 11,
            "10": 10,
            "9": 9,
            "8": 8,
            "7": 7,
            "6": 6,
            "5": 5,
            "4": 4,
            "3": 3,
            "2": 2
        };
        var temp = [], ret = [];
        for (var type in CARD_TYPES) {
            for (var point in CARD_POINTS) {
                temp.push({
                    type: type,
                    point: point
                });
            }
        }
        for (var i = 0; i < parseInt(set, 10); i++) ret = ret.concat(temp);
        return _.shuffle(ret);
    }
    return Game;
});
