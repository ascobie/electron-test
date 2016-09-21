(function () {
    'use strict';
    
    angular
        .module("app")
        .service("accountService", ["$q", "electronService", AccountService]);
    
    function AccountService($q, electronService) {
        return {
            list: listAccounts,
            getById: getAccountById,
            add: addAccount
        };

        function listAccounts() {
            console.log("AccountService.listAccounts");
            var deferred = $q.defer();

            electronService.accounts().then(function (response) {
                console.log(' electronService.accounts(): ', response);
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function getAccountById(id) {
            console.log("AccountService.getAccountById");
            var deferred = $q.defer();
            deferred.resolve({ id: "acc-1", name: "acc1-fromGetById", selected: true });

            return deferred.promise;
        }

        function addAccount(account) {
            console.log("AccountService.addAccount: ", account);
            var deferred = $q.defer();
            electronService.addAccount(JSON.stringify(account))
            deferred.resolve();

            return deferred.promise;
        }
    }
})();
