(function () {
    'use strict';

    angular
        .module("app")
        .controller("homeController", ["electronService", "$scope", "adalAuthenticationService", "$location", HomeController]);

    function HomeController(electronService, $scope, adalService, $location) {
        var self = this;
        
        $scope.systemInfo = {};
        $scope.pingCounter = 0;
        loadInfo();

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
            return viewLocation === $location.path();
        };

        $scope.ping = function () {
            $scope.pingCounter++;
        };
        
        function loadInfo() {
            electronService.info().then(function (response) {
                $scope.systemInfo = response;
            });
        }
    }
})();
