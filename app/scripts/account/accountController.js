(function () {
    'use strict';

    angular
        .module('app')
        .controller('accountController', ['accountService', '$q', '$scope', AccountController]);
    
    function AccountController(accountService, $q, $scope) {
        var self = this;

        self.selected = null;
        self.accounts = [];
        self.selectedIndex = 0;
        self.validationErrors = [];
        self.filterText = null;
        self.selectAccount = selectAccount;
        self.state = state;
        self.adding = false;
        self.selected = false;

        $scope.master = {};

        // Load initial data
        loadAccounts();
        
        function selectAccount(account, index) {
            state('select')
            self.selected = angular.isNumber(index) ? self.accounts[index] : account;
            self.selectedIndex = index;
        }

        function loadAccounts() {
            accountService.list().then(function (accounts) {
                if (accounts && !Array.isArray(accounts)) {
                    self.accounts.push(accounts);
                    return;
                }

                if (accounts && accounts.length > 0) {
                    self.accounts = accounts;
                    self.selected = accounts[0];
                }
            });
        }

        function state(myState) {
            self.adding = myState == "add";
            self.selected = myState == "selected";
        }

        function validateAccount(account) {
            const found = self.accounts.find(item => item.url === account.url)
            if (!!found) {
                self.validationErrors.push("account with url: " + account.url + " already exists");
                return;
            }

            if (!account.alias) {
                self.validationErrors.push("account alias is required");
            }
            if (!account.name) {
                self.validationErrors.push("account name is required");
            }
            if (!account.url) {
                self.validationErrors.push("account url is required");
            }
            if (!account.key) {
                self.validationErrors.push("account key is required");
            }

            return !self.validationErrors || self.validationErrors.length == 0;
        }

        $scope.add = function(account) {
            self.validationErrors = [];
            account.isDefault = !!account.isDefault;

            if(validateAccount(account)) {
                $scope.master = angular.copy(account);
                accountService.add(account).then(function () {
                    self.accounts.push(account);
                });
            }
        };

        $scope.reset = function() {
            $scope.account = angular.copy($scope.master);
            self.validationErrors = [];
        };

        $scope.reset();
    }
})();
