(function () {
    "use strict";

    angular
        .module("app")
        .component("accountDropDown", {
            templateUrl: "./scripts/account/templates/account-drop-down.html",
            controllerAs: "_ctrl",
            controller: AccountDropDownController
        });

    function AccountDropDownController($rootScope, electronService) {
        var self = this;        
        self.account = {};
        self.accounts = [];
        self.onAccountChange = function () {
            broadcastChangeEvent(self.account);
        };

        loadAccounts();

        function loadAccounts() {
            electronService.accounts().then(function (accounts) {
                console.log("got accounts: ", accounts);
                if (accounts && !Array.isArray(accounts)) {
                    self.accounts.push(accounts);
                }

                if (accounts && accounts.length > 0) {
                    self.accounts = accounts;
                }

                setSelectedItem(self.accounts);
            });
        }

        /**
         * Will set the selected account to either the one that is maked as default 
         * or the first in the list.
         */
        function setSelectedItem(accounts) {
            var result = null;
            accounts.some(function(account, index) {
                return account.isDefault ? ((result = account), true) : false;
            });

            // set the selected item and broadcast the change event 
            self.account = result || accounts[0]
            broadcastChangeEvent(self.account);
        }

        /**
         * Send out a broadcast message that the selected account has changed. 
         * Note that we might want to manage this via a single instance object as 
         * each controller has it's own <account-list /> component. I want a 
         * change to the selected account to flow through to every controller.
         */
        function broadcastChangeEvent(account) {
            $rootScope.$broadcast("accountSelected", account);
        }
    }
})();
