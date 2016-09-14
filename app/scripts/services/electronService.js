
(function () {
    'use strict';
    
    angular.module('app').service('electronService', ['$q', '$http', ElectronService]);
    
    function ElectronService($q, $http) {
        console.log("ElectronService");
        return {
            info: getElectronInfo
        };

        function getElectronInfo() {
            console.log("ElectronService.getElectronInfo");
            var deferred = $q.defer();

            $http.get("http://localhost:3000/info").then(
                function (response) {
                    deferred.resolve(response.data); 
                }, function (error) {
                    deferred.reject(error); 
                }
            );

            return deferred.promise;
        }
    }
})();
