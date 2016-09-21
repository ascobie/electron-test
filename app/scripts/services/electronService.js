(function () {
    'use strict';
    
    angular
        .module('app')
        .service('electronService', ['$q', '$http', ElectronService]);
    
    function ElectronService($q, $http) {
        return {
            info: getElectronInfo,
            accounts: getUserAccounts,
            addAccount: addAccount
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

        function getUserAccounts() {
            console.log("ElectronService.getUserAccounts");
            var deferred = $q.defer();

            $http.get("http://localhost:3000/accounts").then(
                function (response) {
                    console.log("ElectronService.getUserAccounts: ", response.data, response.data.length);
                    deferred.resolve(response.data); 
                }, function (error) {
                    deferred.reject(error); 
                }
            );

            return deferred.promise;
        }

        function addAccount(account) {
            console.log("ElectronService.addAccount");
            var deferred = $q.defer();

            $http.post("http://localhost:3000/accounts", account).then(
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
