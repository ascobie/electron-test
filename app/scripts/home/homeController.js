(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', ['$scope', 'adalAuthenticationService', '$location', HomeController]);

    function HomeController($scope, adalService, $location) {
        var self = this;

        console.log("HomeController");

        $scope.login = function () {
            console.log("$scope.login");
            // this is what the o365 app did
            //window.location.href = "http://localhost:3000/auth";
            adalService.login();
        };

        $scope.logout = function () {
            console.log("$scope.logout");
            adalService.logOut();
        };

        $scope.isActive = function (viewLocation) {
            console.log("$scope.isActive");
            return viewLocation === $location.path();
        };

        $scope.ping = function () {
            console.log("$scope.ping");
        };
    }
})();
