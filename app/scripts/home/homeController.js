(function () {
    'use strict';

    angular
        .module("app")
        .controller("homeController", ["electronService", "$scope", "$location", HomeController]);

    function HomeController(electronService, $scope, $location) {
        var self = this;
        
        $scope.systemInfo = {};
        $scope.pingCounter = 0;
        loadInfo();

        $scope.login = function () {
            console.log("$scope.login");
            // todo: not working
            // adalService.login();
        };

        $scope.logout = function () {
            console.log("$scope.logout");
            // todo: not working
            // adalService.logOut();
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
